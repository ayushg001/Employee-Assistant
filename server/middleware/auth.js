import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'pulseai_super_secret_jwt_key_2026';

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (_error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

// Middleware to verify admin role
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized: Admin privileges required' });
  }
  next();
};
