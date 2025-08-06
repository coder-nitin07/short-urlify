const mongoose = require('mongoose');

const blacklistSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: String,
        required: true
    }
});

blacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistSchema);
module.exports = BlacklistedToken;