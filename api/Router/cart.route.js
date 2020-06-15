const router = require('express').Router();

const authMiddleware = require('../Middleware/auth.middleware');
const {
  addToCart,
  getCarts,
  deleteCart,
  toRentBook,
} = require('../Controllers/cart.controller.js');

router.put('/:bookId', authMiddleware, addToCart);
router.get('/', authMiddleware, getCarts);
router.delete('/:id', authMiddleware, deleteCart);
router.put('/', authMiddleware, toRentBook);

module.exports = router;
