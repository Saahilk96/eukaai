import express from 'express';
import { getSubModuleContent } from './subModuleContent.controller.js';
import { validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getSubModuleContentParamsSchema } from './subModuleContent.validators.js';

const router = express.Router();

router.get('/:fullGuideId/:subModuleId',authMiddleware,validateParams(getSubModuleContentParamsSchema),getSubModuleContent);

export default router;