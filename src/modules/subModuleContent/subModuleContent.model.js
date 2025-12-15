import mongoose from "mongoose";

const subModuleContentSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullGuideId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    subModuleId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    htmlText:{
      type:String,
      required: true
    }
  },
  { timestamps: true }
);

const subModuleContent = mongoose.model("subModuleContent", subModuleContentSchema);

export default subModuleContent;