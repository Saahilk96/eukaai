import express from 'express';
import { getSubModules,markSubModule } from './subModule.controller.js';
import { validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getSubModulesParamsSchema,markSubModuleParamsSchema } from './subModule.validators.js';

const router = express.Router();

router.get('/:fullGuideId/:moduleId',authMiddleware,validateParams(getSubModulesParamsSchema),getSubModules);
router.put('/:fullGuideId/:moduleId/:subModuleId',authMiddleware,validateParams(markSubModuleParamsSchema),markSubModule);

export default router;