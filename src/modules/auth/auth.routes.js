import express from 'express';
import { login, refreshToken, logout} from './auth.controller.js';
import {loginUserSchema} from "./auth.validators.js";
import { validateBody } from '../../middleware/validate.middleware.js';

const router = express.Router();

router.post('/login',validateBody(loginUserSchema), login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;
