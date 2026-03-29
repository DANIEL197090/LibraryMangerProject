const Book = require('../models/books');
const Student = require('../models/student');
const LibraryAttendant = require('../models/libraryAttendants');

// @desc    Create Book
// @route   POST /api/v1/books
// @access  Private
exports.createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, data: book });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'ISBN already exists' });
        }
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get All Books (with Pagination and Search)
// @route   GET /api/v1/books
// @access  Public
exports.getBooks = async (req, res) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude from query matching
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
        removeFields.forEach(param => delete reqQuery[param]);

        // Support for search by title
        if (req.query.search) {
            reqQuery.title = { $regex: req.query.search, $options: 'i' };
        }

        // Initialize query
        query = Book.find(reqQuery).populate('authors');

        // Select fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const total = await Book.countDocuments(reqQuery);

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const books = await query.populate('borrowedBy').populate('issuedBy');

        // Pagination result
        const pagination = {};
        if (startIndex + limit < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: books.length,
            total,
            pagination,
            data: books
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Single Book
// @route   GET /api/v1/books/:id
// @access  Public
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('authors')
            .populate('borrowedBy')
            .populate('issuedBy');

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update Book
// @route   PUT /api/v1/books/:id
// @access  Private
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete Book
// @route   DELETE /api/v1/books/:id
// @access  Private
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Borrow Book
// @route   POST /api/v1/books/:id/borrow
// @access  Private
exports.borrowBook = async (req, res) => {
    const { studentId, attendantId, returnDate } = req.body;

    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        if (book.status === 'OUT') {
            return res.status(400).json({ success: false, message: 'Book is already borrowed' });
        }

        // Optional: Check if student exists
        const student = await Student.findOne({ studentId });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Optional: Check if attendant exists
        const attendant = await LibraryAttendant.findOne({ staffId: attendantId });
        if (!attendant) {
            return res.status(404).json({ success: false, message: 'Attendant not found' });
        }

        // Update book fields
        book.status = 'OUT';
        book.borrowedBy = student._id;
        book.issuedBy = attendant._id;
        book.returnDate = new Date(returnDate);

        await book.save();

        res.status(200).json({
            success: true,
            message: `Book ${book.title} successfully borrowed`,
            data: book
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Return Book
// @route   POST /api/v1/books/:id/return
// @access  Private
exports.returnBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        if (book.status === 'IN') {
            return res.status(400).json({ success: false, message: 'Book is already in the library' });
        }

        // Reset book fields
        book.status = 'IN';
        book.borrowedBy = null;
        book.issuedBy = null;
        book.returnDate = null;

        await book.save();

        res.status(200).json({
            success: true,
            message: `Book ${book.title} successfully returned`,
            data: book
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Overdue Books
// @route   GET /api/v1/books/overdue
// @access  Private
exports.getOverdueBooks = async (req, res) => {
    try {
        const now = new Date();
        const overdueBooks = await Book.find({
            status: 'OUT',
            returnDate: { $lt: now }
        }).populate('authors borrowedBy issuedBy');

        res.status(200).json({
            success: true,
            count: overdueBooks.length,
            data: overdueBooks
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
