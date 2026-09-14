import Newsletter from '../models/Newsletter.js';

// POST /api/newsletter/subscribe - save email to database
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // If email already exists, return: "You are already subscribed"
    const existing = await Newsletter.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({ message: 'You are already subscribed' });
    }

    const subscription = new Newsletter({
      email: cleanEmail,
    });

    await subscription.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      subscription,
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ message: 'Subscription failed. Please try again later.' });
  }
};
