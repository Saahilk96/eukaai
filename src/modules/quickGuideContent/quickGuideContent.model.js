import mongoose from "mongoose";

const quickGuideContentSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullGuideId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    htmlText:{
      type:String,
      required:true
    },
    questionsHtmlText:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

const quickGuideContent = mongoose.model("quickGuideContent", quickGuideContentSchema);

export default quickGuideContent;