// routes/signupRoutes.js
const express = require('express');
const router = express.Router();
const signup = require('../controllers/signupController');
const authenticate = require('../config/auth'); // Import the authentication middleware.

// Route to handle user registration
router.post('/signup', authenticate, signup.signup);

module.exports = router;
