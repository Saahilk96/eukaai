import subModule from "./subModule.model.js";

export const getSubModules = async (condition) => {
  return await subModule.find(condition);
}

export const markSubModule = async (condition) => {
  return await subModule.updateOne(condition,{$bit:{completed:{xor:1}}});
}
