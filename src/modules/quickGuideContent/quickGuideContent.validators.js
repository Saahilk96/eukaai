import Joi from "joi";

export const getQuickGuideContentParamsSchema = Joi.object({
  quickGuideId:Joi.string().length(24).hex().required()
});