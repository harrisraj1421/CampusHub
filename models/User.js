const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin', 'library', 'canteen'],
        default: 'student'
    },
    password: { type: String, required: true },
    skills: [{ type: String }],
    campus: { type: String },
    profilePic: { type: String, default: '/images/default-avatar.png' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
