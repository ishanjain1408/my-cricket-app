// controllers/profileController.js
const Profile = require('../models/Profile');

const profile = {
  changePassword: (req, res) => {
    const userId = req.admin.userId; // Assuming you have access to the authenticated user's ID
    const newPassword = req.body.newPassword;

    Profile.changePassword(userId, newPassword, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Password changed successfully' });
      }
    });
  },

  changeEmail: (req, res) => {
    const userId = req.admin.userId; // Assuming you have access to the authenticated user's ID
    const newEmail = req.body.newEmail;

    Profile.changeEmail(userId, newEmail, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Email changed successfully' });
      }
    });
  },

  addProfilePicture: (req, res) => {
    const userId = req.admin.userId; // Assuming you have access to the authenticated user's ID
    const profilePicUrl = req.body.profilePicUrl;

    Profile.addProfilePicture(userId, profilePicUrl, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Profile picture added successfully' });
      }
    });
  },

  viewWalletBalance: (req, res) => {
    const userId = req.admin.userId; // Assuming you have access to the authenticated user's ID

    Profile.viewWalletBalance(userId, (err, balance) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ walletBalance: balance });
      }
    });
  },

  viewTotalPointsAndCoins: (req, res) => {
    const userId = req.admin.userId; // Assuming you have access to the authenticated user's ID

    Profile.viewTotalPointsAndCoins(userId, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(result);
      }
    });
  },
};

module.exports = profile;
