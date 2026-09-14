import express from 'express';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import {
  getContacts,
  deleteContact,
  getUsers,
  getQuotes,
} from '../controllers/adminController.js';

const router = express.Router();

// Protect all admin routes (returns 401 if invalid or not admin)
router.use(verifyToken, requireAdmin);

// GET /api/admin/contacts - view all contact form submissions
router.get('/contacts', getContacts);

// DELETE /api/admin/contacts/:id - delete a submission
router.delete('/contacts/:id', deleteContact);

// GET /api/admin/users - view all registered users
router.get('/users', getUsers);

// GET /api/admin/quotes - view all quote requests
router.get('/quotes', getQuotes);

export default router;
