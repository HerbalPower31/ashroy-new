const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { logger } = require('../config/logger');

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('room', 'roomNumber type');
    res.json(bookings);
  } catch (error) {
    logger.error('Error getting bookings:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('room', 'roomNumber type pricePerNight');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    logger.error('Error getting booking:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['user', 'room', 'checkIn', 'checkOut', 'guests'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Check room availability
    const room = await Room.findById(req.body.room);
    if (!room) {
      throw new Error('Room not found');
    }
    if (room.status !== 'Available') {
      throw new Error('Room is not available for booking');
    }

    // Validate dates
    const checkIn = new Date(req.body.checkIn);
    const checkOut = new Date(req.body.checkOut);
    if (checkIn >= checkOut) {
      throw new Error('Check-out date must be after check-in date');
    }

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      room: room._id,
      status: { $nin: ['Cancelled'] },
      $or: [
        { checkIn: { $lte: checkOut }, checkOut: { $gte: checkIn } },
        { checkIn: { $gte: checkIn, $lte: checkOut } },
        { checkOut: { $gte: checkIn, $lte: checkOut } }
      ]
    });

    if (overlappingBooking) {
      throw new Error('Room is already booked for these dates');
    }

    // Validate guest count
    if (req.body.guests.adults + (req.body.guests.children || 0) > room.capacity) {
      throw new Error(`Room capacity exceeded. Maximum capacity is ${room.capacity} guests`);
    }

    // Calculate total price
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * room.pricePerNight;

    const booking = new Booking({
      user: req.body.user,
      room: room._id,
      checkIn,
      checkOut,
      guests: req.body.guests,
      totalPrice,
      specialRequests: req.body.specialRequests,
      status: 'Confirmed'
    });

    // Save booking
    const newBooking = await booking.save();

    // Update room status
    room.status = 'Reserved';
    await room.save();

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate('user', 'name email phone')
      .populate('room', 'roomNumber type pricePerNight');

    res.status(201).json(populatedBooking);
  } catch (error) {
    logger.error('Error creating booking:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] != null) {
        booking[key] = req.body[key];
      }
    });

    const updatedBooking = await booking.save();
    const populatedBooking = await Booking.findById(updatedBooking._id)
      .populate('user', 'name email phone')
      .populate('room', 'roomNumber type pricePerNight');

    res.json(populatedBooking);
  } catch (error) {
    logger.error('Error updating booking:', error);
    res.status(400).json({ message: error.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    if (booking.status === 'Cancelled') {
      throw new Error('Booking is already cancelled');
    }

    // Update booking status
    booking.status = 'Cancelled';
    booking.cancellationReason = req.body.reason;
    booking.cancellationDate = new Date();
    await booking.save();

    // Update room status
    const room = await Room.findById(booking.room);
    room.status = 'Available';
    await room.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    logger.error('Error cancelling booking:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('room', 'roomNumber type pricePerNight')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    logger.error('Error getting user bookings:', error);
    res.status(500).json({ message: error.message });
  }
}; 