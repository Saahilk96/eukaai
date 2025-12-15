import subModuleContent from "./subModuleContent.model.js";

export const getSubModuleContent = async (condition) => {
  return await subModuleContent.findOne(condition);
}