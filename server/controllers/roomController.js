const Room = require('../models/Room');
const Booking = require('../models/Booking');
const { logger } = require('../config/logger');

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    logger.error('Error getting rooms:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    logger.error('Error getting room:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new room
exports.createRoom = async (req, res) => {
  try {
    const room = new Room({
      roomNumber: req.body.roomNumber,
      type: req.body.type,
      description: req.body.description,
      capacity: req.body.capacity,
      amenities: req.body.amenities,
      images: req.body.images,
      pricePerNight: req.body.pricePerNight,
      floor: req.body.floor
    });

    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    logger.error('Error creating room:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update room
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] != null) {
        room[key] = req.body[key];
      }
    });

    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } catch (error) {
    logger.error('Error updating room:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete room
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    await room.deleteOne();
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    logger.error('Error deleting room:', error);
    res.status(500).json({ message: error.message });
  }
};

// Search rooms by availability
exports.searchRooms = async (req, res) => {
  try {
    const { type, checkIn, checkOut, capacity, minPrice, maxPrice } = req.query;
    const query = { status: 'Available' };

    if (type) query.type = type;
    if (capacity) query.capacity = { $gte: parseInt(capacity) };
    if (minPrice) query.pricePerNight = { ...query.pricePerNight, $gte: parseFloat(minPrice) };
    if (maxPrice) query.pricePerNight = { ...query.pricePerNight, $lte: parseFloat(maxPrice) };

    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);

      if (startDate >= endDate) {
        return res.status(400).json({ message: 'Check-out date must be after check-in date' });
      }

      const bookedRoomIds = await Booking.distinct('room', {
        $or: [
          { checkIn: { $lte: endDate }, checkOut: { $gte: startDate } },
          { checkIn: { $gte: startDate, $lte: endDate } },
          { checkOut: { $gte: startDate, $lte: endDate } }
        ],
        status: { $nin: ['Cancelled'] }
      });

      query._id = { $nin: bookedRoomIds };
    }

    const rooms = await Room.find(query)
      .select('roomNumber type description capacity amenities images pricePerNight floor')
      .sort({ pricePerNight: 1 });

    res.json(rooms);
  } catch (error) {
    logger.error('Error searching rooms:', error);
    res.status(500).json({ message: error.message });
  }
}; 