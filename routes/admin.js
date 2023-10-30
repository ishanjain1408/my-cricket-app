// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// Login route
router.post('/login', adminController.login);

// Add more routes for other admin operations (e.g., creating leagues, adding statements).

module.exports = router;
