import quickGuideKeyFact from "./quickGuideKeyFact.model.js";

export const getQuickGuideKeyFact = async (condition) => {
  return await quickGuideKeyFact.findOne(condition)
}