import Joi from "joi";

export const addWaitListSchema = Joi.object({
  email: Joi.string().email().required()
});