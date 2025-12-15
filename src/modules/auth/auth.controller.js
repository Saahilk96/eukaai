import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import environmentVariables from "../../config/env.js";

const isProd = environmentVariables.nodeEnv === "production";

// Generate tokens with minimal payload (only user.id)
const generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, environmentVariables.accessTokenSecret, {
    expiresIn: environmentVariables.accessTokenExpiry,
  });

const generateRefreshToken = (userId) =>
  jwt.sign({ id: userId }, environmentVariables.refreshTokenSecret, {
    expiresIn: environmentVariables.refreshTokenExpiry,
  });

export const login = async (req, res, next) => {
  try {
    const { email, ...rest } = req.body;

    // 1️⃣ Find user (fast lean)
    let user = await User.findOne({ email }).select("-refreshToken").lean();

    // 2️⃣ If no user, create immediately (only 1 write)
    if (!user) {
      const newUser = await User.create({ email, ...rest });
      user = newUser.toObject(); // convert mongoose doc to plain object
    }

    // 3️⃣ Generate tokens using only _id
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // 4️⃣ Only store refresh token in DB (single fast update)
    await User.updateOne(
      { _id: user._id },
      { $set: { refreshToken } }
    );

    // 5️⃣ Set secure cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "Login successful", user});
  } catch (error) {
    next(error);
  }
};


// Refresh Access Token
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res.status(401).json({ message: "Refresh token required" });

  try {
    const payload = jwt.verify(token, environmentVariables.refreshTokenSecret);
    const user = await User.findById(payload.id);

    if (!user || user.refreshToken != token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user._id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    res.status(403).json({ message: "refresh token expired, please login" });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res.status(401).json({ message: "Refresh token required" });

  try {
    const payload = jwt.verify(token, environmentVariables.refreshTokenSecret);
    const user = await User.findById(payload.id);

    if (user) {
      user.refreshToken = "";
      await user.save();
    }
    // Clear cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });

    res.json({ message: "Logout successful" });
  } catch {
    // Ignore any invalid token error
    res.status(403).json({ message: "refresh token expired" });
  }
};