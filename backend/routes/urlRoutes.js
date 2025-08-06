const express = require('express');
const blacklistToken = require('../middleware/blacklistToken');
const { urlShortner, redirectUser, getAllUserUrls, deleteUserURL } = require('../controllers/urlController');
const urlRouter = express.Router();

urlRouter.post('/urlShortner', blacklistToken, urlShortner);
urlRouter.get('/redirectUser/:shortUrl', redirectUser);
urlRouter.get('/getUserUrls', blacklistToken, getAllUserUrls);
urlRouter.delete('/deleteUrl/:urlId', blacklistToken, deleteUserURL);

module.exports = urlRouter;