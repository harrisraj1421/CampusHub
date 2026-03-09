const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const auth = require('../middleware/auth');

// @route   GET api/resources
// @desc    Get all resources
// @access  Private
router.get('/', auth, resourceController.getResources);

// @route   POST api/resources
// @desc    Upload resource
// @access  Private
router.post('/', auth, resourceController.uploadResource);

// @route   POST api/resources/rate
// @desc    Rate resource
// @access  Private
router.post('/rate', auth, resourceController.rateResource);

module.exports = router;
