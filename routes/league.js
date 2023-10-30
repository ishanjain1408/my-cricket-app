// routes/league.js
const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/league');

// Create a new league
router.post('/', leagueController.createLeague);

// Get leagues for a specific match
router.get('/match/:matchId', leagueController.getLeaguesByMatch);

// Add more routes for other league operations (e.g., locking leagues, updating league details).

module.exports = router;
