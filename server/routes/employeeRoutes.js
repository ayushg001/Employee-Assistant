import express from 'express';
import { getEmployees, getAnalytics } from '../controllers/employeeController.js';

const router = express.Router();

// GET /api/employees - Get all employees with optional department & search
router.get('/', getEmployees);

// GET /api/employees/analytics - Live organizational analytics calculated from MongoDB
router.get('/analytics', getAnalytics);

export default router;
