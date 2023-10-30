// controllers/contest.js
const Contest = require('../models/Contest');

exports.getContestsByMatch = async (req, res) => {
  const { matchId } = req.params;
  try {
    const contests = await Contest.getContestsByMatch(matchId);
    res.json({ success: true, contests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Add more controller methods for other contest operations (e.g., joining contests, checking results).
