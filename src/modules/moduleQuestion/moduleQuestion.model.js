import mongoose from "mongoose";

const moduleQuestionSchema = new mongoose.Schema(
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
    title:{
      type: String,
      required: true
    },
    summaryText:{
      type:String,
      required: true
    }
  },
  { timestamps: true }
);

const moduleQuestion = mongoose.model("moduleQuestion", moduleQuestionSchema);

export default moduleQuestion;