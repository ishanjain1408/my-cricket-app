// models/Contest.js
const db = require('../config/db');

class Contest {
  static getContestsByMatch(matchId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM contests WHERE match_id = ?', [matchId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Add more methods for contest operations.
}

module.exports = Contest;
