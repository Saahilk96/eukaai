import express from 'express';
import { getQuickGuides,deleteQuickGuide,createQuickGuide, getQuickGuide } from './quickGuide.controller.js';
import { validateParams,validateBody,validateQuery } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getQuickGuidesQuerySchema,createQuickGuideSchema,deleteQuickGuideParamsSchema, getQuickGuideParamsSchema } from './quickGuide.validators.js';
import multer from 'multer';

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post('/',authMiddleware,upload.single("resume"),validateBody(createQuickGuideSchema), createQuickGuide);
router.get('/all',authMiddleware,validateQuery(getQuickGuidesQuerySchema),getQuickGuides);
router.get('/:quickGuideId',authMiddleware,validateParams(getQuickGuideParamsSchema),getQuickGuide);
router.delete('/:quickGuideId',authMiddleware,validateParams(deleteQuickGuideParamsSchema), deleteQuickGuide);

export default router;