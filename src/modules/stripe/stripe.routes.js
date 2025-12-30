import express from "express";
import {
  createCheckoutSession,
  stripeWebhook,
  cancelSubscription,
  verifyPayment,
} from "./stripe.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-checkout-session", authMiddleware, createCheckoutSession);
router.post("/stripe-webhook", stripeWebhook);
router.post("/cancel-subscription", authMiddleware, cancelSubscription);
router.post("/verify-payment", authMiddleware, verifyPayment);

export default router;
