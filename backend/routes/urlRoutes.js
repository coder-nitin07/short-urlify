const express = require('express');
const blacklistToken = require('../middleware/blacklistToken');
const { urlShortner } = require('../controllers/urlController');
const urlRouter = express.Router();

urlRouter.post('/urlShortner', blacklistToken, urlShortner);

module.exports = urlRouter;