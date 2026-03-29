const Author = require('../models/authors');

// @desc    Create Author
// @route   POST /api/v1/authors
// @access  Private (Library Attendants only)
exports.createAuthor = async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json({ success: true, data: author });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get All Authors
// @route   GET /api/v1/authors
// @access  Public
exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json({ success: true, count: authors.length, data: authors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Single Author
// @route   GET /api/v1/authors/:id
// @access  Public
exports.getAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }
        res.status(200).json({ success: true, data: author });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update Author
// @route   PUT /api/v1/authors/:id
// @access  Private
exports.updateAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!author) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }
        res.status(200).json({ success: true, data: author });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete Author
// @route   DELETE /api/v1/authors/:id
// @access  Private
exports.deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
