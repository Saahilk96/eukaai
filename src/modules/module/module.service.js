import module from "./module.model.js";

export const getModules = async (condition) => {
  return await module.find(condition);
}
