// routes/match.js
const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match');

// Create a new match
router.post('/', matchController.createMatch);

// Get match details by match ID
router.get('/:matchId', matchController.getMatch);

// Add more routes for other match operations (e.g., updating match details, listing upcoming matches).

module.exports = router;
