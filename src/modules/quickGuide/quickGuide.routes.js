import express from 'express';
import { getQuickGuides,deleteQuickGuide,createQuickGuide } from './quickGuide.controller.js';
import { validateParams,validateBody,validateQuery } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getQuickGuidesQuerySchema,createQuickGuideSchema,deleteQuickGuideParamsSchema } from './quickGuide.validators.js';

const router = express.Router();

router.post('/',authMiddleware,validateBody(createQuickGuideSchema), createQuickGuide);
router.get('/all',authMiddleware,validateQuery(getQuickGuidesQuerySchema),getQuickGuides);
router.delete('/:fullGuideId',authMiddleware,validateParams(deleteQuickGuideParamsSchema), deleteQuickGuide);

export default router;