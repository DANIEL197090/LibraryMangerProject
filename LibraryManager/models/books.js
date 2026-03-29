const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true
    },
    isbn: {
        type: String,
        required: [true, 'Book ISBN is required'],
        unique: true
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: [true, 'At least one author is required']
    }],
    status: {
        type: String,
        enum: ["IN", "OUT"],
        default: "IN"
    },
    borrowedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: null
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LibraryAttendant',
        default: null
    },
    returnDate: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;