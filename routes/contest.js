// routes/contest.js
const express = require('express');
const router = express.Router();
const contestController = require('../controllers/contest');

// Get contests for a specific match
router.get('/match/:matchId', contestController.getContestsByMatch);

// Add more routes for other contest operations (e.g., joining contests, checking results).

module.exports = router;
