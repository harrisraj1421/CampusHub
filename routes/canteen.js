const express = require('express');
const router = express.Router();
const canteenController = require('../controllers/canteenController');
const auth = require('../middleware/auth');

// @route   GET api/canteen/menu
// @desc    Get menu items
// @access  Private
router.get('/menu', auth, canteenController.getMenu);

// @route   POST api/canteen/order
// @desc    Pre-order meals
// @access  Private
router.post('/order', auth, canteenController.createOrder);

// @route   GET api/canteen/my-orders
// @desc    Get current student's orders
// @access  Private
router.get('/my-orders', auth, canteenController.getMyOrders);

// @route   GET api/canteen/all-orders
// @desc    Get all orders (Canteen Staff/Admin)
// @access  Canteen/Admin only
router.get('/all-orders', auth, async (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'canteen') {
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
}, canteenController.getAllOrders);

// @route   PUT api/canteen/order/:id
// @desc    Update order status
// @access  Canteen/Admin only
router.put('/order/:id', auth, async (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'canteen') {
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
}, canteenController.updateOrderStatus);

module.exports = router;
