import express from 'express';
import { getModuleNotes,getModuleNote, updateModuleNote } from './moduleNote.controller.js';
import { validateBody, validateParams } from '../../middleware/validate.middleware.js'; // your middleware path
import authMiddleware from '../../middleware/auth.middleware.js';
import { getModuleNotesParamsSchema,getModuleNoteParamsSchema, updateModuleNoteParamsSchema, updateModuleNoteBody } from './moduleNote.validators.js';

const router = express.Router();

router.get('/:fullGuideId/:moduleId',authMiddleware,validateParams(getModuleNoteParamsSchema),getModuleNote);
router.get('/:fullGuideId',authMiddleware,validateParams(getModuleNotesParamsSchema),getModuleNotes);
router.put('/:fullGuideId/:moduleId',authMiddleware,validateParams(updateModuleNoteParamsSchema),validateBody(updateModuleNoteBody),updateModuleNote);

export default router;