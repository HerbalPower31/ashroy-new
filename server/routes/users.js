const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Test route to create a sample user
router.post('/test-user', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Create new user
router.post('/', userController.createUser);

// Update user
router.patch('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router; 