import Joi from "joi";

export const getQuickGuideInterviewQuestionsByRoundParamsSchema = Joi.object({
  quickGuideId:Joi.string().length(24).hex().required()
});