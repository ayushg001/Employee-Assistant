import express from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAnalytics,
} from '../controllers/employeeController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/employees/analytics - Live organizational analytics calculated from MongoDB
router.get('/analytics', getAnalytics);

// GET /api/employees - Get all employees with optional department, search & pagination
router.get('/', getEmployees);

// GET /api/employees/:id - Get single employee by ID
router.get('/:id', getEmployeeById);

// Role-Based Authorization (Bonus feature): Only Admin can create, update, or delete employees
router.post('/', verifyToken, requireAdmin, createEmployee);
router.put('/:id', verifyToken, requireAdmin, updateEmployee);
router.delete('/:id', verifyToken, requireAdmin, deleteEmployee);

export default router;
