import express from 'express';
import { getUsers,getUser } from './user.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/all',authMiddleware, getUsers);
router.get('/profile',authMiddleware, getUser);

export default router;