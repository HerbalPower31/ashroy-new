const jwt = require('jsonwebtoken');
const { logger } = require('../config/logger');

// JWT middleware for validating tokens
const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Token validation error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Requires admin role' });
    }
    next();
  } catch (error) {
    logger.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to attach user info to request
const attachUserInfo = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      // Add mock user in development
      req.user = {
        id: 'dev-user',
        email: 'dev@example.com',
        roles: ['admin']
      };
      return next();
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decoded.id,
        email: decoded.email,
        roles: decoded.roles || []
      };
    }
    next();
  } catch (error) {
    logger.error('User info attachment error:', error);
    next(error);
  }
};

module.exports = {
  validateToken,
  isAdmin,
  attachUserInfo
}; 