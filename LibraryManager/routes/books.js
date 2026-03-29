const express = require('express');
const router = express.Router();
const {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    getOverdueBooks
} = require('../controllers/books');
const { protect } = require('../middleware/auth');

const { bookValidator, borrowValidator } = require('../middleware/validator');

router.get('/overdue', protect, getOverdueBooks);

router.route('/')
      .get(getBooks)
      .post(protect, bookValidator, createBook);

router.route('/:id')
      .get(getBook)
      .put(protect, bookValidator, updateBook)
      .delete(protect, deleteBook);

router.post('/:id/borrow', protect, borrowValidator, borrowBook);
router.post('/:id/return', protect, returnBook);

module.exports = router;
