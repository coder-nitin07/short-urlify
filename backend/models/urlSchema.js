const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const urlSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    originalUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true,
        default: ()=> nanoid()
    },
    shortUrl: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const URL = mongoose.model('URL', urlSchema);
module.exports = URL;