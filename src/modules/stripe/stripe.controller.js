import Stripe from "stripe";
import environmentVariables from "../../config/env.js";
import User from "../user/user.model.js";

const stripe = new Stripe(environmentVariables.stripeSecretKey);

const generateIdempotencyKey = (userId) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  return `sub-${userId}-${today}`;
};

export const createCheckoutSession = async (req, res, next) => {
  try {
    if (req.user.paymentDone)
      return res
        .status(400)
        .json({ success: false, message: "Already subscribed" });

    // 🔑 Generate or reuse key
    let idempotencyKey = req.user.idempotencyKey;

    if (!idempotencyKey) {
      idempotencyKey = generateIdempotencyKey(req.user._id);

      await User.findByIdAndUpdate(req.user._id, {
        idempotencyKey,
        idempotencyCreatedAt: new Date(),
      });
    }

    const session = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        customer_email: req.user.email,

        metadata: { user_id: req.user._id.toString() },

        subscription_data: {
          metadata: { user_id: req.user._id.toString() },
        },

        payment_method_types: ["card"],

        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: "Premium Plan" },
              unit_amount: 2000,
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],

        // success_url: `https://www.eukaai.com/payment-success`,
        success_url: `http://localhost:3000/payment-status`,
        // cancel_url: `https://www.eukaai.com/payment-cancel`,
        cancel_url: `http://localhost:3000/payment-status`,
      },
      {
        idempotencyKey,
      }
    );

    res.json({ success: true, url: session.url });
  } catch (err) {
    next(err);
  }
};

export const stripeWebhook = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const eventType = event.type;
  const data = event.data.object;

  console.log("EVENT TYPE:", eventType);

  // -----------------------
  // GET SUBSCRIPTION ID
  // -----------------------
  const subscriptionId =
    data.subscription || data?.parent?.subscription_details?.subscription;

  // -----------------------
  // GET USER ID FROM METADATA
  // -----------------------
  let userId = null;

  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    userId = subscription?.metadata?.user_id;
  }

  if (!userId) {
    userId =
      data?.metadata?.user_id ||
      data?.parent?.subscription_details?.metadata?.user_id;
  }

  // -----------------------------
  // 1. invoice.payment_succeeded
  // -----------------------------
  if (eventType === "invoice.payment_succeeded") {
    if (!userId || !subscriptionId) {
      console.log("⚠ No userId or subscriptionId found");
      return res.json({ status: "ignored" });
    }

    await User.findByIdAndUpdate(userId, {
      paymentDone: true,
      subscriptionId: subscriptionId,
      idempotencyKey: null,
      idempotencyCreatedAt: null,
    });

    console.log("✅ Payment succeeded:", userId);
  }

  // -----------------------------
  // 2. customer.subscription.updated
  // -----------------------------
  if (eventType === "customer.subscription.updated") {
    if (data.cancel_at_period_end === true && userId) {
      await User.findByIdAndUpdate(userId, {
        paymentDone: false,
      });

      console.log("⌛ Subscription will cancel:", userId);
    }
  }

  // -----------------------------
  // 3. customer.subscription.deleted
  // -----------------------------
  if (eventType === "customer.subscription.deleted") {
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        paymentDone: false,
        subscriptionId: null,
        idempotencyKey: null,
        idempotencyCreatedAt: null,
      });

      console.log("❌ Subscription cancelled:", userId);
    }
  }

  // -----------------------------
  // 4. invoice.payment_failed
  // -----------------------------
  if (eventType === "invoice.payment_failed") {
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        paymentDone: false,
        idempotencyKey: null,
        idempotencyCreatedAt: null,
      });

      console.log("❌ Payment failed:", userId);
    }
  }

  return res.json({ status: "success" });
};

export const cancelSubscription = async (req, res, next) => {
  try {

    if (!req.user.paymentDone) {
      return res.status(400).json({
        status: "Not Ok",
        error: "No active subscription",
      });
    }

    if (!req.user.subscriptionId) {
      return res.status(400).json({
        status: false,
        error: "Subscription ID missing",
      });
    }

    await stripe.subscriptions.update(req.user.subscriptionId, {
      cancel_at_period_end: true,
    });

    await User.findByIdAndUpdate(req.user._id, {
      paymentDone: false,
    });

    return res.json({ status: "success"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req,res,next) => {
    try {
    return res.json({ status: req.user.paymentDone});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
