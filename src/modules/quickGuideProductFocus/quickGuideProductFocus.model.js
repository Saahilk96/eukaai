import mongoose from "mongoose";

const quickGuideProductFocusSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    quickGuideId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productFocusHtml:{
      type: String,
      required:true
    }
  },
  { timestamps: true }
);

const quickGuideProductFocus = mongoose.model("quickGuideProductFocus", quickGuideProductFocusSchema);

export default quickGuideProductFocus;