import mongoose from "mongoose";

const moduleSummarySchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullGuideId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    moduleId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    summaryHtmlText:{
      type:String,
      required: true
    }
  },
  { timestamps: true }
);

const moduleSummary = mongoose.model("moduleSummary", moduleSummarySchema);

export default moduleSummary;