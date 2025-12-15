import Joi from "joi";

export const getModuleNoteParamsSchema = Joi.object({
  fullGuideId:Joi.string().length(24).hex().required(),
  moduleId:Joi.string().length(24).hex().required(),
});

export const getModuleNotesParamsSchema = Joi.object({
  fullGuideId:Joi.string().length(24).hex().required(),
});

export const updateModuleNoteParamsSchema = Joi.object({
  fullGuideId:Joi.string().length(24).hex().required(),
  moduleId:Joi.string().length(24).hex().required(),
});

export const updateModuleNoteBody = Joi.object({
  note:Joi.array().items(Joi.object()).required()
});

