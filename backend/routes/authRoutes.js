const express = require('express');
const { createUser, loginUser, logoutUser } = require('../controllers/authController');
const authValidation = require('../middleware/authValidation');
const validateLogin = require('../middleware/authLogin');
const authRouter = express.Router();

authRouter.post('/register', authValidation, createUser);
authRouter.post('/login', validateLogin, loginUser);
authRouter.post('/logout', logoutUser);

module.exports = authRouter;