// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Create a new user
router.post('/', userController.createUser);

// Get user details by user ID
router.get('/:userId', userController.getUserById);

// Update user information
router.put('/:userId', userController.updateUser);

// Add more routes for other user operations (e.g., change password, get wallet balance).

module.exports = router;
