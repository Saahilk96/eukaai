import * as userService from "./user.service.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    let user = await userService.getUser({ _id: req.user._id });

    // let fullGuides 
    // let quickGuides 

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
