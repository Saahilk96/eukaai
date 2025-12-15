import User from "./user.model.js";

export const getAllUsers = async () => {
  return await User.find().select("-refreshToken -__v");
};

export const getUser = async (condition) => {
  return await User.findOne(condition).select("-refreshToken -__v");
};

