const router = require('express').Router();

const authMiddleware = require('../Middleware/auth.middleware');
const {
  createStore,
  getStore,
  getStoreById,
  deleteStore,
} = require('../Controllers/store.controller.js');

router.get('/', authMiddleware, getStore);
router.get('/:storeId', authMiddleware, getStoreById);
router.post('/', authMiddleware, createStore);
router.delete('/:storeId', authMiddleware, deleteStore);

module.exports = router;
