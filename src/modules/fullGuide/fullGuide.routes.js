import express from 'express';
import multer from 'multer';
import { createFullGuide, deleteFullGuide, getFullGuide, getFullGuides } from './fullGuide.controller.js';
import { createFullGuideSchema,deleteFullGuideParamsSchema, getFullGuideParamsSchema, getFullGuidesQuerySchema } from './fullGuide.validators.js';
import { validateBody,validateParams, validateQuery } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post('/',authMiddleware,upload.single("resume"),validateBody(createFullGuideSchema), createFullGuide);
router.get('/all',authMiddleware,validateQuery(getFullGuidesQuerySchema),getFullGuides);
router.get('/:fullGuideId',authMiddleware,validateParams(getFullGuideParamsSchema),getFullGuide);
router.delete('/:fullGuideId',authMiddleware,validateParams(deleteFullGuideParamsSchema), deleteFullGuide);

export default router;