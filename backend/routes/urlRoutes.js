const express = require('express');
const blacklistToken = require('../middleware/blacklistToken');
const { urlShortner, redirectUser } = require('../controllers/urlController');
const urlRouter = express.Router();

urlRouter.post('/urlShortner', blacklistToken, urlShortner);
urlRouter.get('/redirectUser/:shortUrl', redirectUser);

module.exports = urlRouter;