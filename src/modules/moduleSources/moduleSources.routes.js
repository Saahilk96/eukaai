import express from 'express';
import { getModuleSources } from './moduleSources.controller.js';
import { validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getModuleSourcesParamsSchema } from './moduleSources.validators.js';

const router = express.Router();

router.get('/:fullGuideId/:moduleId',authMiddleware,validateParams(getModuleSourcesParamsSchema),getModuleSources);

export default router;