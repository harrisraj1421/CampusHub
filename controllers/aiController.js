const Book = require('../models/Book');
const Resource = require('../models/Resource');

// @desc    AI Campus Assistant Chatbot
// @route   POST /api/ai/chat
exports.campusAssistant = async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ message: 'Query is missing' });

    try {
        const q = query.toLowerCase();
        let response = "I'm your CampusHub AI. How can I help you today?";

        // Logic for library book search
        if (q.includes('book') || q.includes('library')) {
            const searchTerms = q.split(' ').filter(word => word.length > 3 && !['library', 'book', 'show', 'when', 'where', 'find'].includes(word));
            if (searchTerms.length > 0) {
                const searchTerm = searchTerms[0];
                const books = await Book.find({ title: { $regex: searchTerm, $options: 'i' } }).limit(2);
                if (books.length > 0) {
                    response = `Found ${books.length} book(s) related to "${searchTerm}": ${books.map(b => b.title + ' (' + b.campus + ')').join(', ')}. Would you like to reserve one?`;
                } else {
                    response = `I couldn't find any books matching "${searchTerm}" in our system. Try searching by the author's name!`;
                }
            } else {
                response = `You can ask me things like "Show books for Data Structures" or "Is the library open?"`;
            }
        }
        // Logic for resource hub/study materials
        else if (q.includes('notes') || q.includes('study') || q.includes('pdf')) {
            const searchTerms = q.split(' ').filter(word => word.length > 3 && !['notes', 'study', 'pdf', 'show', 'find', 'suggest'].includes(word));
            if (searchTerms.length > 0) {
                const searchTerm = searchTerms[0];
                const resources = await Resource.find({ title: { $regex: searchTerm, $options: 'i' } }).limit(2);
                if (resources.length > 0) {
                    response = `I found some ${searchTerm} materials for you: ${resources.map(r => r.title).join(', ')}. You can download them in the Resource Hub!`;
                } else {
                    response = `No study materials found for "${searchTerm}" yet. You could be the first to upload them!`;
                }
            } else {
                response = `I can suggest study materials! Try asking "Suggest notes for Algorithms".`;
            }
        }
        // Logic for canteen
        else if (q.includes('canteen') || q.includes('food') || q.includes('order')) {
            response = `The canteen is currently serving lunch! You can pre-order your meal from the "Smart Canteen" section to avoid the queue. Crowds are usually low at this time.`;
        }
        // Generic
        else {
            response = `That's interesting! I'm still learning about campus life. You can ask me about library books, study notes, or canteen orders.`;
        }

        res.json({ response });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
