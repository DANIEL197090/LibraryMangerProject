const express = require('express');
const router = express.Router();
const {
    createStudent,
    getStudents,
    getStudent
} = require('../controllers/student');
const { protect } = require('../middleware/auth');

const { studentValidator } = require('../middleware/validator');

router.route('/')
      .get(getStudents)
      .post(protect, studentValidator, createStudent);

router.route('/:id')
      .get(getStudent);

module.exports = router;
