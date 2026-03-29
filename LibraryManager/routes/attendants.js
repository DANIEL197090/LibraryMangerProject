const express = require('express');
const router = express.Router();
const {
    getAttendants,
    getAttendant
} = require('../controllers/attendants');

router.get('/', getAttendants);
router.get('/:id', getAttendant);

module.exports = router;
