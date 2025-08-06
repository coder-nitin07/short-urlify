const User = require("../models/authSchema");
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

// Redirect User
const redirectUser = async (req, res)=>{
    try {
        const { shortUrl } = req.params;
        const getShortURL = await URL.findOne({ shortId: shortUrl });

        if(!getShortURL){
            return res.status(404).json({ message: 'Not a valid short URL' });
        }

        getShortURL.clicks += 1;
        getShortURL.lastClicked = new Date();
        await getShortURL.save();

        return res.redirect(301, getShortURL.originalUrl);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get All URL Shortner of a User
const getAllUserUrls = async (req, res)=>{
    try {
        const userId = req.user.id;
        const getUser = await User.findById(userId);

        if(!getUser){
            return res.status(404).json({ message: 'No User Found' });
        }

        const userUrls = await URL.find({ userId }).sort({ createdAt: -1 });

        if(userUrls.length === 0){
            return res.status(200).json({ message: 'No URL found' });
        }

        res.status(200).json({ message: 'Successfully Fetch User URLs', urls: userUrls });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete An URLs
const deleteUserURL = async (req, res)=>{
    try {
        const userId = req.user.id; 
        const { urlId } = req.params;
        
        const url = await URL.findById(urlId);
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        if (url.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this URL' });
        }

        await URL.findByIdAndDelete(urlId);
        res.status(200).json({ message: 'URL deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Analytics API
const getAnalytics = async (req, res)=>{
    try {
        const { urlId } = req.params;
        const url = await URL.findOne({ shortId: urlId });

        if(!url){
            return res.status(404).json({ message: 'URL not found' });
        }

        res.status(200).json({ 
            message: 'Get Analystics data',  
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl,
            clicks: url.clicks,
            createdAt: url.createdAt,
            lastClicked: url.lastClicked
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { urlShortner, redirectUser, getAllUserUrls, deleteUserURL, getAnalytics };