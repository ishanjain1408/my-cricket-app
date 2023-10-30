// routes/wallet.js
const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet');

// Get wallet balance for the user
router.get('/:userId/balance', walletController.getBalance);

// Deposit an amount into the user's wallet
router.post('/:userId/deposit', walletController.deposit);

// Withdraw an amount from the user's wallet
router.post('/:userId/withdraw', walletController.withdraw);

// Add more routes for other wallet operations (e.g., transaction history).

module.exports = router;
