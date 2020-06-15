const router = require('express').Router();

const authMiddleware = require('../Middleware/auth.middleware');
const {
  getTransactions,
  createTransaction,
  complete,
} = require('../Controllers/transaction.controller.js');

router.get('/', authMiddleware, getTransactions);
router.post('/:bookId', authMiddleware, createTransaction);
router.put('/:id', complete);

module.exports = router;
