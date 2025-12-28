import Joi from "joi";

export const createQuickGuideSchema = Joi.object({
  jobRole: Joi.string().min(3).required(),
  jobDescription: Joi.string().min(3).required(),
  companyName: Joi.string().min(3).required(),
  companyWebsite: Joi.string().uri().min(3),
  resume: Joi.any().optional(),
});

export const deleteQuickGuideParamsSchema = Joi.object({
  quickGuideId: Joi.string().length(24).hex().required(),
});

export const getQuickGuideParamsSchema = Joi.object({
  quickGuideId: Joi.string().length(24).hex().required(),
});

export const getQuickGuidesQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).required().messages({
    "number.base": "limit must be a number",
    "number.min": "limit cannot be less than 1",
    "number.max": "limit cannot be more than 100",
  }),

  offset: Joi.number().integer().min(0).required().messages({
    "number.base": "offset must be a number",
    "number.min": "offset cannot be negative",
  }),
});
