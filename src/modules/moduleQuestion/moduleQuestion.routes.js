import express from 'express';
import { getModuleQuestion } from './moduleQuestion.controller.js';
import { validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getModuleQuetionParamsSchema } from './moduleQuestion.validators.js';

const router = express.Router();

router.get('/:fullGuideId/:moduleId',authMiddleware,validateParams(getModuleQuetionParamsSchema),getModuleQuestion);

export default router;