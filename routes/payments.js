const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

// @route   POST api/payments/pay
// @desc    Make a payment
// @access  Private
router.post('/pay', auth, paymentController.initiatePayment);

// @route   GET api/payments/history
// @desc    Current student's payment history
// @access  Private
router.get('/history', auth, paymentController.getPaymentHistory);

// @route   GET api/payments/all-payments
// @desc    All payments (Admin only)
// @access  Admin only
router.get('/all-payments', auth, async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
}, paymentController.getAllPayments);

// @route   GET api/payments/analytics
// @desc    Payment analytics (Admin only)
// @access  Admin only
router.get('/analytics', auth, async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
}, paymentController.getAnalytics);

module.exports = router;
