// controllers/admin.js
const Admin = require('../models/Admin');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.login(username, password);
    if (admin) {
      // Generate a JWT token and send it as a response for authentication.
      const token = 'YOUR_JWT_TOKEN';
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Add more controller methods for other admin operations.
