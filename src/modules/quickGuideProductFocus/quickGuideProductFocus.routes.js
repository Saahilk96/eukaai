import express from 'express';
import { validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getQuickGuideProductFocusParamsSchema } from './quickGuideProductFocus.validators.js';
import { getQuickGuideProductFocus } from './quickGuideProductFocus.controller.js';

const router = express.Router();

router.get('/:quickGuideId',authMiddleware,validateParams(getQuickGuideProductFocusParamsSchema), getQuickGuideProductFocus);

export default router;