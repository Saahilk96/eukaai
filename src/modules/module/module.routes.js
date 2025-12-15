import express from 'express';
import { getModules } from './module.controller.js';
import { getModulesParamsSchema } from './module.validators.js';
import { validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/:fullGuideId/all',authMiddleware,validateParams(getModulesParamsSchema),getModules);

export default router;