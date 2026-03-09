const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const authMiddleware = require('../middleware/auth');

// @route   GET api/library/books
// @desc    Get all books
// @access  Private
router.get('/books', authMiddleware, libraryController.getBooks);

// @route   POST api/library/books
// @desc    Add a book
// @access  Admin only
router.post('/books', authMiddleware, async (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'library') {
        return res.status(403).json({ message: 'Access denied. Library staff and admins only.' });
    }
    next();
}, libraryController.addBook);

// @route   POST api/library/reserve/:id
// @desc    Reserve a book
// @access  Private
router.post('/reserve/:id', authMiddleware, libraryController.reserveBook);

// @route   GET api/library/overdue
// @desc    Get overdue books
// @access  Admin only
router.get('/overdue', authMiddleware, async (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'library') {
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
}, libraryController.getOverdueBooks);

module.exports = router;
