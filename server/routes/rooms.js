const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Get all rooms
router.get('/', roomController.getAllRooms);

// Get a specific room
router.get('/:id', roomController.getRoomById);

// Create a new room
router.post('/', roomController.createRoom);

// Update a room
router.patch('/:id', roomController.updateRoom);

// Delete a room
router.delete('/:id', roomController.deleteRoom);

// Search rooms by availability
router.get('/search/availability', roomController.searchRooms);

module.exports = router; 