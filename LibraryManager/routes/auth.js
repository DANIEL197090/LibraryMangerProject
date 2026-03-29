const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');

router.post('/register/libraryAttendant', register);
router.post('/login/libraryAttendant', login);

module.exports = router;
