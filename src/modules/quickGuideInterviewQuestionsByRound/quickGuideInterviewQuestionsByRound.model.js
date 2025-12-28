import mongoose from "mongoose";

const quickGuideInterviewQuestionsByRoundSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    quickGuideId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    interviewQuestionsByRoundHtml:{
      type: String,
      required:true
    }
  },
  { timestamps: true }
);

const quickGuideInterviewQuestionsByRound = mongoose.model("quickGuideInterviewQuestionsByRound", quickGuideInterviewQuestionsByRoundSchema);

export default quickGuideInterviewQuestionsByRound;