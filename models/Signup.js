// models/Signup.js
const db = require('../config/db');

const Signup = {
  create: (userData, callback) => {
    db.query('INSERT INTO users (username, email, mobile, password, referral_id) VALUES (?, ?, ?, ?, ?)',
      [userData.username, userData.email, userData.mobile, userData.password, userData.referral_id], callback);
  },
};

module.exports = Signup;
