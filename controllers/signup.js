// controllers/signupController.js
const Signup = require('../models/Signup');

const signup = {
  create: (req, res) => {
    const userData = req.body; // Assuming you use a body parser to parse JSON data from the request
    
    Signup.create(userData, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'User signed up successfully' });
      }
    });
  },
};

module.exports = signup;
