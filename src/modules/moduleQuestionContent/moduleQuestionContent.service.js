import moduleQuestionContent from "./moduleQuestionContent.model.js";

export const getModuleQuestionContents = async (condition) => {
  return await moduleQuestionContent.find(condition);
}

export const getModuleQuestionContent = async (condition) => {
  return await moduleQuestionContent.findOne(condition);
}

export const updateModuleQuestionContent = async (condition,data) => {
  return await moduleQuestionContent.updateOne(condition,{$set:data});
}