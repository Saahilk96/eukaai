import moduleSummary from "./moduleSummary.model.js";

export const getModuleSummary = async (condition) => {
  return await moduleSummary.findOne(condition);
}