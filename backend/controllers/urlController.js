const URL = require("../models/urlSchema");
const { nanoid } = require('nanoid');

// URL Shortener API
const urlShortner = async (req, res)=>{
    try {
        const { originalUrl } = req.body;

        if(!originalUrl){
            return res.status(404).json({ message: 'Please provide the original URL.' });
        }

        const shortId = nanoid(6);

        const shortUrl = `https://shorturilify.com/${shortId}`;

        const generateShortURL = await URL.create({
            userId: req.user.id,
            originalUrl,
            shortId,
            shortUrl
        });

        res.status(200).json({ message: 'Short URL generated', URL: generateShortURL });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


module.exports = { urlShortner };