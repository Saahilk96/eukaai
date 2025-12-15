import Joi from "joi";

export const getSubModuleContentParamsSchema = Joi.object({
  fullGuideId:Joi.string().length(24).hex().required(),
  subModuleId:Joi.string().length(24).hex().required()
});
