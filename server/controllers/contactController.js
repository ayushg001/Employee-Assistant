import Contact from '../models/Contact.js';

// POST /api/contact - save contact form data to database
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Server-side validation for all required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ message: 'Subject is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      contact,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Failed to submit contact message. Please try again later.' });
  }
};
