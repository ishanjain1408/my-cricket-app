// controllers/statement.js
const Statement = require('../models/Statement');
const Selection = require('../models/Selection');

// Create a new statement
exports.createStatement = async (req, res) => {
  try {
    const { text, leagueId, userId } = req.body;

    // Check if the user has already selected 10 statements for the league
    const userStatementCount = await Statement.countDocuments({ league: leagueId, user: userId });
    if (userStatementCount >= 10) {
      return res.status(400).json({ message: 'You have reached the maximum limit of 10 selected statements.' });
    }

    const statement = new Statement({ text, league: leagueId, user: userId });
    await statement.save();
    res.status(201).json(statement);
  } catch (error) {
    console.error('Error creating statement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve statements for a specific league
exports.getStatementsByLeague = async (req, res) => {
  try {
    const { leagueId, userId } = req.params;

    // Retrieve statements for the specified league and user
    const statements = await Statement.find({ league: leagueId, user: userId });
    res.status(200).json(statements);
  } catch (error) {
    console.error('Error retrieving statements:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.selectStatements = async (req, res) => {
  try {
    const { userId, statementIds } = req.body;

    if (!userId || !Array.isArray(statementIds) || statementIds.length === 0) {
      return res.status(400).json({ error: 'Invalid input data.' });
    }

    if (statementIds.length > 10) {
      return res.status(400).json({ error: 'You can select up to 10 statements.' });
    }

    const existingSelection = await Selection.findOne({ userId });

    if (existingSelection) {
      existingSelection.statementIds = statementIds;
      await existingSelection.save();
    } else {
      const newSelection = new Selection({ userId, statementIds });
      await newSelection.save();
    }

    res.status(200).json({ message: 'Statements selected and saved successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserSelection = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const userSelection = await Selection.findOne({ userId }).populate('statementIds');

    if (!userSelection) {
      return res.status(404).json({ error: 'User selection not found.' });
    }

    res.status(200).json(userSelection);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add more controller methods for other statement operations (e.g., updating statements, checking statement results).



// Add more controller methods for other statement operations (e.g., updating statements, checking statement results).
