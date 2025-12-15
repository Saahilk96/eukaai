import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullGuideId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: { type: String, required: true, trim: true, minlength: 3 },
    summaryText: { type: String, required: true, trim: true, minlength: 3 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    isSources: {type: Boolean, default: false}
  },
  { timestamps: true }
);

const module = mongoose.model("module", moduleSchema);

export default module;