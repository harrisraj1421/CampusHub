const Payment = require('../models/Payment');
const Order = require('../models/Order');

// @desc    Initiate a payment (Simulated)
// @route   POST /api/payments/pay
exports.initiatePayment = async (req, res) => {
    const { amount, type, orderId } = req.body;

    try {
        const payment = new Payment({
            studentId: req.user.id,
            amount,
            type, // 'libraryFine', 'canteenBill', 'campusDues'
            status: 'completed', // Simulated auto-success
            receipt: `RCPT-${Date.now()}`
        });

        await payment.save();

        // If it's a canteen bill, update order status
        if (type === 'canteenBill' && orderId) {
            await Order.findByIdAndUpdate(orderId, { paymentStatus: 'paid' });
        }

        res.status(200).json({ message: 'Payment successful', payment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get current student's payment history
// @route   GET /api/payments/history
exports.getPaymentHistory = async (req, res) => {
    try {
        const history = await Payment.find({ studentId: req.user.id }).sort({ date: -1 });
        res.json(history);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get all payments (Admin/Staff)
// @route   GET /api/payments/all-payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('studentId', 'name email').sort({ date: -1 });
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get analytics summary (Admin only)
// @route   GET /api/payments/analytics
exports.getAnalytics = async (req, res) => {
    try {
        const payments = await Payment.find({ status: 'completed' });
        const summary = payments.reduce((acc, p) => {
            acc.total += p.amount;
            acc[p.type] = (acc[p.type] || 0) + p.amount;
            return acc;
        }, { total: 0 });

        res.json(summary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
