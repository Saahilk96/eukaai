import Joi from "joi";

export const getQuickGuideKeyFactParamsSchema = Joi.object({
  quickGuideId:Joi.string().length(24).hex().required()
});