import express from 'express';
import { validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getQuickGuideKeyFactParamsSchema } from './quickGuideKeyFact.validators.js';
import { getQuickGuideKeyFact } from './quickGuideKeyFact.controller.js';

const router = express.Router();

router.get('/:quickGuideId',authMiddleware,validateParams(getQuickGuideKeyFactParamsSchema), getQuickGuideKeyFact);

export default router;