const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);   // Routes for authentication
router.use('/user',protect, userRoutes);   // Routes for user-related operations

module.exports = router;
