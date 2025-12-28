import quickGuideInterviewQuestionsByRound from "./quickGuideInterviewQuestionsByRound.model.js";

export const getQuickGuideInterviewQuestionsByRound = async (condition) => {
  return await quickGuideInterviewQuestionsByRound.findOne(condition)
}