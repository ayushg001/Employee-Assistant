import express from 'express';
import { submitQuote } from '../controllers/quoteController.js';

const router = express.Router();

// POST /api/quote - save quote request to database
router.post('/', submitQuote);

export default router;
