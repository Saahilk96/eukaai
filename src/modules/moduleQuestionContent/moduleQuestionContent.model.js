import mongoose from "mongoose";

const moduleQuestionContentSchema = new mongoose.Schema(
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
    question:{
      type: String,
      required: true
    },
    answer:{
      type: String
    }
  },
  { timestamps: true }
);

const moduleQuestionContent = mongoose.model("moduleQuestionContent", moduleQuestionContentSchema);

export default moduleQuestionContent;