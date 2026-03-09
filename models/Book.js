const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    campus: { type: String, required: true },
    availability: { type: Boolean, default: true },
    totalCopies: { type: Number, default: 1 },
    availableCopies: { type: Number, default: 1 },
    reservationQueue: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dueDate: { type: Date }
});

module.exports = mongoose.model('Book', bookSchema);
