import Joi from "joi";

export const getModuleQuetionParamsSchema = Joi.object({
  fullGuideId:Joi.string().length(24).hex().required(),
  moduleId:Joi.string().length(24).hex().required()
});