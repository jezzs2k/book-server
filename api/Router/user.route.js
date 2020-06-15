const router = require('express').Router();
const authMiddleware = require('../Middleware/auth.middleware');

const {
  profile,
  deleteUser,
  updateUser,
  getProfileById,
} = require('../Controllers/user.controller.js');

router.get('/profile', authMiddleware, profile);
router.get('/profile/:userId', authMiddleware, getProfileById);
router.delete('/', authMiddleware, deleteUser);
router.put('/', authMiddleware, updateUser);

module.exports = router;
