import moduleSources from "./moduleSources.model.js";

export const getModuleSources = async (condition) => {
  return await moduleSources.find(condition);
}