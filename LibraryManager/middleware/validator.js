// Manual validation middleware to avoid missing dependencies
const validate = (req, res, next, checks) => {
    const errors = [];
    checks.forEach(check => {
        const value = req.body[check.field];
        if (check.required && (value === undefined || value === null || value === '')) {
            errors.push({ field: check.field, message: check.message });
        } else if (check.pattern && value && !check.pattern.test(value)) {
            errors.push({ field: check.field, message: check.message });
        } else if (check.isArray && value && (!Array.isArray(value) || value.length < check.min)) {
            errors.push({ field: check.field, message: check.message });
        }
    });

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }
    next();
};

// Author validation rules
exports.authorValidator = (req, res, next) => {
    validate(req, res, next, [
        { field: 'name', required: true, message: 'Name is required' }
    ]);
};

// Book validation rules
exports.bookValidator = (req, res, next) => {
    validate(req, res, next, [
        { field: 'title', required: true, message: 'Title is required' },
        { field: 'isbn', required: true, message: 'ISBN is required' },
        { field: 'authors', required: true, isArray: true, min: 1, message: 'At least one author ID is required' }
    ]);
};

// Student validation rules
exports.studentValidator = (req, res, next) => {
    validate(req, res, next, [
        { field: 'name', required: true, message: 'Name is required' },
        { field: 'email', required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: 'Enter a valid email address' },
        { field: 'studentId', required: true, message: 'Student ID is required' }
    ]);
};

// Borrow validation rules
exports.borrowValidator = (req, res, next) => {
    validate(req, res, next, [
        { field: 'studentId', required: true, message: 'Student ID is required' },
        { field: 'attendantId', required: true, message: 'Attendant ID is required' },
        { field: 'returnDate', required: true, message: 'Valid return date is required' }
    ]);
};

