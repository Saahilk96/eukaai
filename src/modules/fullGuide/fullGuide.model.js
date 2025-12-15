import mongoose from "mongoose";

const fullGuideSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    jobRole: { type: String, required: true, trim: true, minlength: 3 },
    companyName: { type: String, required: true, trim: true, minlength: 3 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    isNotes: {type: Boolean, default: false}
  },
  { timestamps: true }
);

const fullGuide = mongoose.model("fullGuide", fullGuideSchema);

export default fullGuide;
