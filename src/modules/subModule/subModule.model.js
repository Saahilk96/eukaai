import mongoose from "mongoose";

const subModuleSchema = new mongoose.Schema(
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
    title: { type: String, required: true, trim: true, minlength: 3 },
    summaryText: { type: String, required: true, trim: true, minlength: 3 },
    completed: {type:Number,default:0}
  },
  { timestamps: true }
);

const subModule = mongoose.model("subModule", subModuleSchema);

export default subModule;