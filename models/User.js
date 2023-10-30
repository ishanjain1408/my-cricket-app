// models/User.js
const db = require('../config/db'); // Import the MySQL database connection.

function createUser(user) {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (username, email, mobNumber, password, referralId) VALUES (?, ?, ?, ?, ?)',
      [user.username, user.email, user.mobNumber, user.password, user.referralId],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

module.exports = { createUser };
