import express from 'express';
import { getModuleQuestionContents,generateModuleQuestionContentAnswer } from './moduleQuestionContent.controller.js';
import { validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getModuleQuestionContentsParamsSchema,getModuleQuestionContentParamsSchema } from './moduleQuestionContent.validators.js';

const router = express.Router();

router.get('/:fullGuideId/:moduleId',authMiddleware,validateParams(getModuleQuestionContentsParamsSchema),getModuleQuestionContents);
router.put('/:fullGuideId/:moduleId/:moduleQuestionContentId',authMiddleware,validateParams(getModuleQuestionContentParamsSchema),generateModuleQuestionContentAnswer);

export default router;