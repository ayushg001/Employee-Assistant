import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/register - register with name, email, password
router.post('/register', register);

// POST /api/auth/login — login, returns JWT token (expires in 7 days)
router.post('/login', login);

// GET /api/auth/profile - protected route, returns user info
router.get('/profile', verifyToken, getProfile);

export default router;
