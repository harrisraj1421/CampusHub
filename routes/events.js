const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

// @route   GET api/events
// @desc    Get all events
// @access  Private
router.get('/', auth, eventController.getEvents);

// @route   POST api/events
// @desc    Create an event
// @access  Admin only
router.post('/', auth, async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
}, eventController.createEvent);

// @route   POST api/events/register/:id
// @desc    Register for event
// @access  Private
router.post('/register/:id', auth, eventController.registerEvent);

module.exports = router;
