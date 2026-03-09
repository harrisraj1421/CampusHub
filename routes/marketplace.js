const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');
const auth = require('../middleware/auth');

// @route   GET api/marketplace
// @desc    Get all marketplace items
// @access  Private
router.get('/', auth, marketplaceController.getItems);

// @route   POST api/marketplace
// @desc    Post an item to share/exchange/donate
// @access  Private
router.post('/', auth, marketplaceController.addItem);

// @route   PUT api/marketplace/:id
// @desc    Update item status (e.g. mark as taken)
// @access  Private
router.put('/:id', auth, marketplaceController.updateItemStatus);

module.exports = router;
