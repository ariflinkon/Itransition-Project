const express = require('express');
const authRoutes = require('./auth.routes');
const templateRoutes = require('./template.routes');
const userRoutes = require('./user.routes');
const router = express.Router();

// Use the auth routes
router.use('/auth', authRoutes);
router.use('/', templateRoutes);
router.use('/', userRoutes);

module.exports = router;