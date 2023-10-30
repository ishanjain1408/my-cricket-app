// models/Profile.js
const db = require('../config/db'); // Import the MySQL database connection.

const Profile = {
  changePassword: (userId, newPassword, callback) => {
    // Update the user's password in the database
    db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId], callback);
  },

  changeEmail: (userId, newEmail, callback) => {
    // Update the user's email in the database
    db.query('UPDATE users SET email = ? WHERE id = ?', [newEmail, userId], callback);
  },

  addProfilePicture: (userId, profilePicUrl, callback) => {
    // Update the user's profile picture in the database
    db.query('UPDATE users SET profile_pic = ? WHERE id = ?', [profilePicUrl, userId], callback);
  },

  viewWalletBalance: (userId, callback) => {
    // Fetch the user's wallet balance from the database
    db.query('SELECT wallet_balance FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0].wallet_balance);
      }
    });
  },

  viewTotalPointsAndCoins: (userId, callback) => {
    // Fetch the user's total points and coins from the database
    db.query('SELECT total_points, total_coins FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {
          totalPoints: results[0].total_points,
          totalCoins: results[0].total_coins,
        });
      }
    });
  },
};

module.exports = Profile;
