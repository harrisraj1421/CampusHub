const mongoose = require('mongoose');

const marketplaceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ['Books', 'Lab Kits', 'Electronics', 'Stationery', 'Other'],
        required: true
    },
    type: {
        type: String,
        enum: ['Exchange', 'Borrow', 'Donate'],
        required: true
    },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['available', 'taken'],
        default: 'available'
    },
    campus: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketplaceItem', marketplaceSchema);
