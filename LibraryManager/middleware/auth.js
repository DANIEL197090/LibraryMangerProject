const jwt = require('jsonwebtoken');
const LibraryAttendant = require('../models/libraryAttendants');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await LibraryAttendant.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token failed'
        });
    }
};

module.exports = { protect };
