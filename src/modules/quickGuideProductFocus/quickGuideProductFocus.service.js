import quickGuideProductFocus from "./quickGuideProductFocus.model.js";

export const getQuickGuideProductFocus = async (condition) => {
  return await quickGuideProductFocus.findOne(condition)
}