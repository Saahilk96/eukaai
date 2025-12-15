import moduleQuestion from "./moduleQuestion.model.js";

export const getModuleQuestion = async (condition) => {
  return await moduleQuestion.findOne(condition);
}