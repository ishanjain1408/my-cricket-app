// models/Admin.js
const db = require('../config/db');

class Admin {
  static login(username, password) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  // Add more methods for admin operations (e.g., creating leagues, adding statements).
}

module.exports = Admin;
