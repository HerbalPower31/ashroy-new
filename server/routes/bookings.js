const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get a specific booking
router.get('/:id', bookingController.getBookingById);

// Create a new booking
router.post('/', bookingController.createBooking);

// Update a booking
router.patch('/:id', bookingController.updateBooking);

// Cancel a booking
router.post('/:id/cancel', bookingController.cancelBooking);

// Get user's bookings
router.get('/user/:userId', bookingController.getUserBookings);

module.exports = router; 