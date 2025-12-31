import express from 'express';
import { validateBody } from '../../middleware/validate.middleware.js'; // your middleware path
import { addWaitListSchema } from './waitList.validators.js';
import { addWaitList } from './waitList.controller.js';

const router = express.Router();

router.post('/add',validateBody(addWaitListSchema),addWaitList);

export default router;