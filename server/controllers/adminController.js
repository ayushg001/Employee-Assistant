import Contact from '../models/Contact.js';
import User from '../models/User.js';
import Quote from '../models/Quote.js';

// GET /api/admin/contacts - view all contact form submissions
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error('Admin fetch contacts error:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

// DELETE /api/admin/contacts/:id - delete a contact submission
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    res.json({
      success: true,
      message: 'Contact submission deleted successfully',
      id,
    });
  } catch (error) {
    console.error('Admin delete contact error:', error);
    res.status(500).json({ message: 'Failed to delete contact submission' });
  }
};

// GET /api/admin/users - view all registered users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('Admin fetch users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// GET /api/admin/quotes - view all quote requests
export const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: quotes.length,
      quotes,
    });
  } catch (error) {
    console.error('Admin fetch quotes error:', error);
    res.status(500).json({ message: 'Failed to fetch quotes' });
  }
};
