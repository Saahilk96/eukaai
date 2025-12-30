import Stripe from "stripe";
import environmentVariables from "../../config/env.js";
import User from "../user/user.model.js";

const stripe = new Stripe(environmentVariables.stripeSecretKey);

/* ---------------------------------
   IDENTITY / IDEMPOTENCY KEY
---------------------------------- */
const generateIdempotencyKey = (userId) => {
  const today = new Date().toISOString().split("T")[0];

  // if (environmentVariables.nodeEnv !== "production") {
    return `test-sub-${userId}-${Date.now()}`;
  // }

  return `sub-${userId}-${today}`;
};

/* ---------------------------------
   CREATE CHECKOUT SESSION
---------------------------------- */
export const createCheckoutSession = async (req, res, next) => {
  try {
    if (req.user.paymentDone) {
      return res
        .status(400)
        .json({ success: false, message: "Already subscribed" });
    }

    let idempotencyKey = req.user.idempotencyKey;

    // ⏱ Expire idempotency key after 10 minutes
    if (
      !idempotencyKey ||
      (req.user.idempotencyCreatedAt &&
        Date.now() -
          new Date(req.user.idempotencyCreatedAt).getTime() >
          10 * 60 * 1000)
    ) {
      idempotencyKey = generateIdempotencyKey(req.user._id);

      await User.findByIdAndUpdate(req.user._id, {
        idempotencyKey,
        idempotencyCreatedAt: new Date(),
      });
    }

    const sessionObjectData =  {
        mode: "subscription",

        customer_email: req.user.email,

        metadata: {
          user_id: req.user._id.toString(),
        },

        subscription_data: {
          metadata: {
            user_id: req.user._id.toString(),
          },
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

        success_url: `${environmentVariables.frontendUrl}/payment-status?success=true`,
        cancel_url: `${environmentVariables.frontendUrl}/payment-status?canceled=true`,
      }

      console.log(sessionObjectData)

    const session = await stripe.checkout.sessions.create(
     sessionObjectData,
      {
        idempotencyKey,
      }
    );

    return res.json({ success: true, url: session.url });
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------
   STRIPE WEBHOOK
---------------------------------- */
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      environmentVariables.stripeWebhookSecret
    );
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const eventType = event.type;
  const data = event.data.object;

  console.log("🔔 Stripe Event:", eventType);

  // ✅ Always rely on metadata (NO Stripe API calls here)
  const userId =
    data?.metadata?.user_id ||
    data?.subscription_details?.metadata?.user_id;

  const subscriptionId =
    data?.subscription ||
    data?.subscription_details?.subscription;

  try {
    // 1️⃣ PAYMENT SUCCESS
    if (eventType === "invoice.payment_succeeded") {
      console.log(data)
      if (!userId || !subscriptionId) {
        return res.json({ status: "ignored" });
      }


      await User.findByIdAndUpdate(userId, {
        paymentDone: true,
        subscriptionId,
        cancelAtPeriodEnd: false,
        idempotencyKey: null,
        idempotencyCreatedAt: null,
      });

      console.log("✅ Payment successful:", userId);
    }

    // 2️⃣ SUBSCRIPTION UPDATED (Cancel at period end)
    if (eventType === "customer.subscription.updated") {
      if (data.cancel_at_period_end && userId) {
        await User.findByIdAndUpdate(userId, {
          cancelAtPeriodEnd: true,
        });

        console.log("⌛ Cancel scheduled:", userId);
      }
    }

    // 3️⃣ SUBSCRIPTION DELETED (Access revoked)
    if (eventType === "customer.subscription.deleted") {
      if (userId) {
        await User.findByIdAndUpdate(userId, {
          paymentDone: false,
          subscriptionId: null,
          cancelAtPeriodEnd: false,
          idempotencyKey: null,
          idempotencyCreatedAt: null,
        });

        console.log("❌ Subscription ended:", userId);
      }
    }

    // 4️⃣ PAYMENT FAILED
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
  } catch (err) {
    console.error("Webhook DB error:", err);
  }

  return res.json({ received: true });
};

/* ---------------------------------
   CANCEL SUBSCRIPTION
---------------------------------- */
export const cancelSubscription = async (req, res) => {
  try {
    if (!req.user.paymentDone || !req.user.subscriptionId) {
      return res.status(400).json({
        status: false,
        error: "No active subscription",
      });
    }

    await stripe.subscriptions.update(req.user.subscriptionId, {
      cancel_at_period_end: true,
    });

    await User.findByIdAndUpdate(req.user._id, {
      cancelAtPeriodEnd: true,
    });

    return res.json({ status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* ---------------------------------
   VERIFY PAYMENT (FRONTEND CHECK)
---------------------------------- */
export const verifyPayment = async (req, res) => {
  try {
    return res.json({
      status: req.user.paymentDone,
      cancelAtPeriodEnd: req.user.cancelAtPeriodEnd,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
