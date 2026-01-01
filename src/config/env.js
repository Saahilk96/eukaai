import dotenv from "dotenv";
dotenv.config();

const environmentVariables = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
  registrationOtpExpiry: process.env.REGISTRATION_OTP_EXPIRY,
  resetOtpExpiry: process.env.RESET_OTP_EXPIRY,
  resetPasswordExpiry: process.env.RESET_PASSWORD_EXPIRY,
  showRequiredFields: process.env.SHOW_REQUIRED_FIELDS,
  service: process.env.SERVICE,
  openrouterApiKey:process.env.OPENROUTER_API_KEY,
  email: process.env.EMAIL,
  appPassword: process.env.APP_PASSWORD,
  stripeWebhookSecret:process.env.STRIPE_WEBHOOK_SECRET,
  stripeSecretKey:process.env.STRIPE_TEST_SECRET_KEY,
  nodeEnv: process.env.NODE_ENV,
  corsOrigin: process.env.CORS_ORIGIN,
  frontendUrl:process.env.CORS_ORIGIN
};

export default environmentVariables;