const Resource = require('../models/Resource');

exports.getResources = async (req, res) => {
    try {
        const resources = await Resource.find().populate('uploadedBy', 'name');
        res.json(resources);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.uploadResource = async (req, res) => {
    const { title, description, fileUrl, category, tags } = req.body;

    try {
        const newResource = new Resource({
            title,
            description,
            fileUrl,
            category,
            tags,
            uploadedBy: req.user.id
        });

        const resource = await newResource.save();
        res.json(resource);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.rateResource = async (req, res) => {
    const { resourceId, score } = req.body;

    try {
        const resource = await Resource.findById(resourceId);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Check if user already rated
        const existingRating = resource.ratings.find(r => r.studentId.toString() === req.user.id);
        if (existingRating) {
            existingRating.score = score;
        } else {
            resource.ratings.push({ studentId: req.user.id, score });
        }

        await resource.save();
        res.json(resource);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
