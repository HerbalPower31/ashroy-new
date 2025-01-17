const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const bookingRoutes = require('./bookings');
const roomRoutes = require('./rooms');
const authRoutes = require('./auth');
const { validateToken, attachUserInfo } = require('../middleware/auth');

// Health check route
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date(),
    environment: process.env.NODE_ENV
  });
});

// Auth routes (unprotected)
router.use('/auth', authRoutes);

// Protected routes
router.use('/users', validateToken, attachUserInfo, userRoutes);
router.use('/bookings', validateToken, attachUserInfo, bookingRoutes);
router.use('/rooms', attachUserInfo, roomRoutes); // No auth required for viewing rooms

module.exports = router; 