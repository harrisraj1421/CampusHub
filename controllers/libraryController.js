const Book = require('../models/Book');
const User = require('../models/User');

// @desc    Get all books with search and filter
// @route   GET /api/library/books
exports.getBooks = async (req, res) => {
    const { title, author, campus, category } = req.query;
    let query = {};

    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };
    if (campus) query.campus = campus;
    if (category) query.category = category;

    try {
        const books = await Book.find(query);
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Reserve a book
// @route   POST /api/library/reserve/:id
exports.reserveBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.availableCopies > 0) {
            // If available, reserve technically means "ready to pick up"
            book.availableCopies -= 1;
            if (book.availableCopies === 0) book.availability = false;
        } else {
            // Add to queue if no copies available
            if (book.reservationQueue.includes(req.user.id)) {
                return res.status(400).json({ message: 'Already in queue' });
            }
            book.reservationQueue.push(req.user.id);
        }

        await book.save();
        res.json({ message: 'Book reserved successfully', book });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add a new book (Admin only)
// @route   POST /api/library/books
exports.addBook = async (req, res) => {
    const { title, author, category, campus, totalCopies } = req.body;

    try {
        const newBook = new Book({
            title,
            author,
            category,
            campus,
            totalCopies,
            availableCopies: totalCopies
        });

        const book = await newBook.save();
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get overdue books (Admin only)
// @route   GET /api/library/overdue
exports.getOverdueBooks = async (req, res) => {
    try {
        const today = new Date();
        const overdueBooks = await Book.find({
            dueDate: { $lt: today },
            availability: false // Assuming false means it's borrowed
        });
        res.json(overdueBooks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
