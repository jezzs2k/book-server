const router = require('express').Router();

const authMiddleware = require('../Middleware/auth.middleware');
const {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
} = require('../Controllers/book.controller.js');

router.get('/', getBooks);
router.post('/', authMiddleware, createBook);
router.delete('/:id', authMiddleware, deleteBook);
router.put('/:id', authMiddleware, updateBook);

module.exports = router;
