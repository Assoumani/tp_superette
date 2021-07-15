const express = require('express'),
    authController = require('../controllers/auth')

module.exports = (app) => {
    const authRoutes = express.Router();

    authRoutes.post('/login', authController.login);

    app.use('/api/v1', authRoutes)
}
