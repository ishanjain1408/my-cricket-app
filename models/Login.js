// models/Login.js
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const Login = {
  authenticate: (credentials, callback) => {
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [credentials.username, credentials.username], (err, results) => {
      if (err) {
        callback(err, null);
      } else if (results.length === 0) {
        callback(null, null); // User not found
      } else {
        const user = results[0];

        // Validate the password here, you may want to use a password hashing library
        // For simplicity, we're assuming plaintext passwords here.
        if (credentials.password === user.password) {
          // Generate a JWT token and send it back
          const token = jwt.sign({ userId: user.id }, 'YOUR_SECRET_KEY');
          callback(null, { token });
        } else {
          callback(null, null); // Invalid password
        }
      }
    });
  },
};

module.exports = Login;
