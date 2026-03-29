const { body, validationResult } = require('express-validator');

// Error handling middleware for express-validator
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
        });
    }
    next();
};

// Author validation rules
exports.authorValidator = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    validate
];

// Book validation rules
exports.bookValidator = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('isbn').trim().notEmpty().withMessage('ISBN is required'),
    body('authors').isArray({ min: 1 }).withMessage('At least one author ID is required'),
    validate
];

// Student validation rules
exports.studentValidator = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('studentId').trim().notEmpty().withMessage('Student ID is required'),
    validate
];

// Borrow validation rules
exports.borrowValidator = [
    body('studentId').notEmpty().withMessage('Student ID is required'),
    body('attendantId').notEmpty().withMessage('Attendant ID is required'),
    body('returnDate').isISO8601().withMessage('Valid return date is required'),
    validate
];
