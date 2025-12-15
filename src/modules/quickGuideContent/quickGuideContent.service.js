import quickGuide from "./quickGuideContent.model.js";

export const getQuickGuideContent = async (condition) => {
  return await quickGuide.findOne(condition);
}
