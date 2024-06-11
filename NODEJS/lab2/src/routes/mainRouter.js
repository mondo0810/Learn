const express = require('express');
const itemRoutes = require('./itemRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Mount item routes
router.use('/items', itemRoutes);

// Mount user routes
router.use('/users', userRoutes);

// Mount auth routes
router.use('/auth', authRoutes);

module.exports = router;
