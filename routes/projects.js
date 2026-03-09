const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

// @route   GET api/projects
// @desc    Get all active projects
// @access  Private
router.get('/', auth, projectController.getProjects);

// @route   POST api/projects
// @desc    Create a new project
// @access  Private
router.post('/', auth, projectController.createProject);

// @route   POST api/projects/join/:id
// @desc    Join a project
// @access  Private
router.post('/join/:id', auth, projectController.joinProject);

// @route   GET api/projects/me
// @desc    Get current student's projects
// @access  Private
router.get('/me', auth, projectController.getMyProjects);

module.exports = router;
