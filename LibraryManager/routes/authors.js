const express = require('express');
const router = express.Router();
const {
    createAuthor,
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authors');
const { protect } = require('../middleware/auth');

const { authorValidator } = require('../middleware/validator');

router.route('/')
      .get(getAuthors)
      .post(protect, authorValidator, createAuthor);

router.route('/:id')
      .get(getAuthor)
      .put(protect, authorValidator, updateAuthor)
      .delete(protect, deleteAuthor);

module.exports = router;
