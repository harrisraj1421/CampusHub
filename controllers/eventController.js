const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Register for an event
// @route   POST /api/events/register/:id
exports.registerEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Check if user already registered
        if (event.registrations.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        event.registrations.push(req.user.id);
        await event.save();

        res.json({ message: 'Registered successfully!', event });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create an event (Admin only)
// @route   POST /api/events
exports.createEvent = async (req, res) => {
    const { title, description, date, campus, flyerUrl } = req.body;

    try {
        const newEvent = new Event({
            title,
            description,
            date,
            campus,
            flyerUrl
        });

        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
