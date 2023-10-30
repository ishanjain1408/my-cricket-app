// config/auth.js
const jwt = require('jsonwebtoken');

function authenticateAdmin(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided' });

  try {
    const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
    req.admin = decoded; // Attach the admin data to the request object for use in the controller.
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token' });
  }
}

module.exports = authenticateAdmin;
