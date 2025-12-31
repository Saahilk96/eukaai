import mongoose from "mongoose";

const waitListSchema = new mongoose.Schema(
  {
    email:String
  },
  { timestamps: true }
);

const waitList = mongoose.model("waitList", waitListSchema);

export default waitList;