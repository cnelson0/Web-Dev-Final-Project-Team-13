const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');

// Create new transaction
router.post('/', createTransaction);

// Get all transactions
router.get('/', getAllTransactions);

// Get single transaction by ID
router.get('/:id', getTransactionById);

// Get all transactions for a specific user
router.get('/user/:userId', getTransactionsByUser);

// Update transaction by ID
router.put('/:id', updateTransaction);

// Delete transaction by ID
router.delete('/:id', deleteTransaction);

module.exports = router;