import express from 'express';
import { validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getQuickGuideInterviewQuestionsByRoundParamsSchema } from './quickGuideInterviewQuestionsByRound.validators.js';
import { getQuickGuideInterviewQuestionsByRound } from './quickGuideInterviewQuestionsByRound.controller.js';

const router = express.Router();

router.get('/:quickGuideId',authMiddleware,validateParams(getQuickGuideInterviewQuestionsByRoundParamsSchema), getQuickGuideInterviewQuestionsByRound);

export default router;