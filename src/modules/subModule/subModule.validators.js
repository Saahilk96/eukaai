import Joi from "joi";

export const getSubModulesParamsSchema = Joi.object({
  fullGuideId:Joi.string().length(24).hex().required(),
  moduleId:Joi.string().length(24).hex().required()
});

export const markSubModuleParamsSchema = Joi.object({
  fullGuideId:Joi.string().length(24).hex().required(),
  moduleId:Joi.string().length(24).hex().required(),
  subModuleId:Joi.string().length(24).hex().required()
});