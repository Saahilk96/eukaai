import express from 'express';
import { getQuickGuideContent } from './quickGuideContent.controller.js';
import { getQuickGuideContentParamsSchema } from './quickGuideContent.validators.js';
import { validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/:quickGuideId',authMiddleware,validateParams(getQuickGuideContentParamsSchema),getQuickGuideContent);

export default router;