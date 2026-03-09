const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: [{ type: String }],
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teamMembers: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String }
    }],
    githubUrl: { type: String },
    liveUrl: { type: String },
    status: {
        type: String,
        enum: ['active', 'completed', 'recruiting'],
        default: 'recruiting'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
