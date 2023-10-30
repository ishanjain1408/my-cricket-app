// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const authenticateAdmin = require('../config/auth');
const profile = require('../controllers/profile');

// Route for changing password
router.put('/profile/change-password', authenticateAdmin, profile.changePassword);

// Route for changing email
router.put('/profile/change-email', authenticateAdmin, profile.changeEmail);

// Route for adding a profile picture
router.put('/profile/add-profile-pic', authenticateAdmin, profile.addProfilePicture);

// Route for viewing wallet balance
router.get('/profile/wallet-balance', authenticateAdmin, profile.viewWalletBalance);

// Route for viewing total points and coins
router.get('/profile/total-points-coins', authenticateAdmin, profile.viewTotalPointsAndCoins);

module.exports = router;
