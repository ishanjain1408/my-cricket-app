// routes/statement.js
const express = require('express');
const router = express.Router();
const statementController = require('../controllers/statement');

// Create a new statement
router.post('/', statementController.createStatement);

// Get statements for a specific league
router.get('/league/:leagueId', statementController.getStatementsByLeague);

// Add more routes for other statement operations (e.g., updating statements, checking statement results).

module.exports = router;
