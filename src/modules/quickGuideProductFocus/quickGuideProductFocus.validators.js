import Joi from "joi";

export const getQuickGuideProductFocusParamsSchema = Joi.object({
  quickGuideId:Joi.string().length(24).hex().required()
});