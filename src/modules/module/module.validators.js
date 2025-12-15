import Joi from "joi";

export const getModulesParamsSchema = Joi.object({
  fullGuideId:Joi.string().length(24).hex().required()
});