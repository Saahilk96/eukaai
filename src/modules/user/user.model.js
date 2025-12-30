import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    resume: {
      type: String,
    },
    totalGeneratedFullGuides: { type: Number, default: 0 },
    paymentDone: { type: Boolean, default: false },
    refreshToken: { type: String }, // Array to store refresh tokens
    // 🔐 Idempotency handling
    subscriptionId: String,
    cancelAtPeriodEnd: { type: Boolean, default: false },
    idempotencyKey: String,
    idempotencyCreatedAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
