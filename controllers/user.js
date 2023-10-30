// controllers/signupController.js
const User = require('../models/User');

async function signup(req, res) {
  try {
    const { username, email, mobNumber, password, referralId } = req.body;

    // Additional input validation and error handling should be done here.

    const user = { username, email, mobNumber, password, referralId };
    await User.createUser(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { signup };
