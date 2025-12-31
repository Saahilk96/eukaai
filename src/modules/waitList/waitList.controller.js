import mongoose from "mongoose";
import * as waitListService from "./waitList.service.js";
import waitList from "./waitList.model.js";

export const addWaitList = async (req, res) => {
  try {
    const {email} = req.body;

    const alreadyExists = await waitList.findOne({email});
    if(alreadyExists)
      return res.status(200).json({
      status:true,
      message: "wait list already added succcessfully"
    });

    await waitListService.addWaitList({email});

    return res.status(200).json({
      status:true,
      message: "wait list added succcessfully"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

