// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { login } = require('../controllers/Login');

// Route for user login
router.post('/login', login.login);

module.exports = router;
