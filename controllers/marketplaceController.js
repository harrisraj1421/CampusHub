const MarketplaceItem = require('../models/MarketplaceItem');

// @desc    Get all marketplace items
// @route   GET /api/marketplace
exports.getItems = async (req, res) => {
    try {
        const items = await MarketplaceItem.find({ status: 'available' })
            .populate('ownerId', 'name email profilePic campus')
            .sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add item to marketplace
// @route   POST /api/marketplace
exports.addItem = async (req, res) => {
    const { title, description, category, type, campus } = req.body;

    try {
        const newItem = new MarketplaceItem({
            title,
            description,
            category,
            type,
            campus,
            ownerId: req.user.id
        });

        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update item status (e.g. mark as taken)
// @route   PUT /api/marketplace/:id
exports.updateItemStatus = async (req, res) => {
    try {
        let item = await MarketplaceItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Only owner can update OR if someone is taking it (logic for "taking" would be here)
        item.status = req.body.status || item.status;
        await item.save();
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
