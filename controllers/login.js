// controllers/login
const Login = require('../models/Login');

const login = {
  login: (req, res) => {
    const credentials = req.body; // Assuming you use a body parser to parse JSON data from the request

    Login.authenticate(credentials, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else if (!result) {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        res.status(200).json({ token: result.token });
      }
    });
  },
};

module.exports = login;
