import Quote from '../models/Quote.js';

// POST /api/quote - save quote request to database
export const submitQuote = async (req, res) => {
  try {
    const { name, email, phone, serviceRequired, budget, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    if (!serviceRequired || !serviceRequired.trim()) {
      return res.status(400).json({ message: 'Service required is required' });
    }
    if (!budget || !budget.trim()) {
      return res.status(400).json({ message: 'Budget is required' });
    }

    const quote = new Quote({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      serviceRequired: serviceRequired.trim(),
      budget: budget.trim(),
      message: (message || '').trim(),
    });

    await quote.save();

    res.status(201).json({
      success: true,
      message: 'Your quote request has been received! Our team will contact you within 24 hours.',
      quote,
    });
  } catch (error) {
    console.error('Quote submission error:', error);
    res.status(500).json({ message: 'Failed to submit quote request. Please try again later.' });
  }
};
