import Joi from "joi";

export const getModuleQuestionContentsParamsSchema = Joi.object({
  fullGuideId:Joi.string().length(24).hex().required(),
  moduleId:Joi.string().length(24).hex().required()
});

export const getModuleQuestionContentParamsSchema = Joi.object({
  fullGuideId:Joi.string().length(24).hex().required(),
  moduleId:Joi.string().length(24).hex().required(),
  moduleQuestionContentId:Joi.string().length(24).hex().required()
});