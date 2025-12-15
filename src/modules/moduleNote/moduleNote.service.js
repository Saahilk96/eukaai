import moduleNote from "./moduleNote.model.js";

export const getModuleNote = async (condition) => {
  return await moduleNote.findOne(condition);
}

export const getModuleNotes = async (condition) => {
  return await moduleNote.find(condition);
}
