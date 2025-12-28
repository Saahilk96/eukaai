import mongoose from "mongoose";

const quickGuideKeyFactSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    quickGuideId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    keyFactsHtml:{
      type: String,
      required:true
    }
  },
  { timestamps: true }
);

const quickGuideKeyFact = mongoose.model("quickGuideKeyFact", quickGuideKeyFactSchema);

export default quickGuideKeyFact;