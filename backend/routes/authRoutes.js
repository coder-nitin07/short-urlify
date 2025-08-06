const express = require('express');
const { createUser, loginUser } = require('../controllers/authController');
const authValidation = require('../middleware/authValidation');
const validateLogin = require('../middleware/authLogin');
const authRouter = express.Router();

authRouter.post('/register', authValidation, createUser);
authRouter.post('/login', validateLogin, loginUser);

module.exports = authRouter;