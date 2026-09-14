import express from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact - save form data to database
router.post('/', submitContact);

export default router;
