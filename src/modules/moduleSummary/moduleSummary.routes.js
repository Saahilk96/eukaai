import express from 'express';
import { getModuleSummary } from './moduleSummary.controller.js';
import { validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getModuleSummaryParamsSchema } from './moduleSummary.validators.js';

const router = express.Router();

router.get('/:fullGuideId/:moduleId',authMiddleware,validateParams(getModuleSummaryParamsSchema),getModuleSummary);

export default router;