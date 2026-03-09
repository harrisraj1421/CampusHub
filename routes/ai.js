const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

// @route   POST api/ai/chat
// @desc    AI Campus Assistant Chat
// @access  Private
router.post('/chat', authMiddleware, aiController.campusAssistant);

module.exports = router;
