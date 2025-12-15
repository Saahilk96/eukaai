import mongoose from "mongoose";

const quickGuideSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    jobRole:{
      type:String,
      required:true,
    },
    companyName:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

const quickGuide = mongoose.model("quickGuide", quickGuideSchema);

export default quickGuide;