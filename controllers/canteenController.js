const Order = require('../models/Order');

// @desc    Get current menu (Mocked for now, can be stored in DB if needed)
exports.getMenu = async (req, res) => {
    const menu = [
        { id: 1, name: 'Paneer Roll Combo', price: 120, category: 'Veg' },
        { id: 2, name: 'Chicken Biryani', price: 180, category: 'Non-Veg' },
        { id: 3, name: 'Cold Coffee with Ice Cream', price: 80, category: 'Beverage' },
        { id: 4, name: 'Masala Dosa', price: 60, category: 'Veg' },
        { id: 5, name: 'Grilled Sandwich', price: 70, category: 'Veg' }
    ];
    res.json(menu);
};

// @desc    Create a pre-order
// @route   POST /api/canteen/order
exports.createOrder = async (req, res) => {
    const { items, totalPrice, pickupTime } = req.body;

    try {
        const newOrder = new Order({
            studentId: req.user.id,
            items,
            totalPrice,
            pickupTime,
            status: 'pending',
            paymentStatus: 'pending',
            qrCode: `CAMPUS-ORD-${Date.now()}` // Mocked QR
        });

        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get student orders
// @route   GET /api/canteen/my-orders
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ studentId: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update order status (Canteen Staff/Admin)
// @route   PUT /api/canteen/order/:id
exports.updateOrderStatus = async (req, res) => {
    try {
        let order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = req.body.status || order.status;
        order.paymentStatus = req.body.paymentStatus || order.paymentStatus;

        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all active orders (Staff/Admin)
// @route   GET /api/canteen/all-orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('studentId', 'name').sort({ pickupTime: 1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
