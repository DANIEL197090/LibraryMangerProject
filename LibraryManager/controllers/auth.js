const LibraryAttendant = require('../models/libraryAttendants');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

//  Register a Library Attendant
//  POST /api/v1/auth/register/libraryAttendant

exports.register = async (req, res) => {
    const { name, staffId, password } = req.body;

    try {
        const userExists = await LibraryAttendant.findOne({ staffId });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await LibraryAttendant.create({ name, staffId, password });

        if (user) {
            res.status(201).json({
                success: true,
                _id: user._id,
                name: user.name,
                staffId: user.staffId,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//  Login a Library Attendant
// POST /api/v1/auth/login
// Public
exports.login = async (req, res) => {
    const { staffId, password } = req.body;

    try {
        const user = await LibraryAttendant.findOne({ staffId });

        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                success: true,
                _id: user._id,
                name: user.name,
                staffId: user.staffId,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
