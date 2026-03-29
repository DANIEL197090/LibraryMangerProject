const LibraryAttendant = require('../models/LibraryAttendant');

// @desc    Get All Attendants
// @route   GET /api/v1/attendants
// @access  Public
exports.getAttendants = async (req, res) => {
    try {
        const attendants = await LibraryAttendant.find().select('-password');
        res.status(200).json({ success: true, count: attendants.length, data: attendants });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Single Attendant
// @route   GET /api/v1/attendants/:id
// @access  Public
exports.getAttendant = async (req, res) => {
    try {
        const attendant = await LibraryAttendant.findById(req.params.id).select('-password');
        if (!attendant) {
            return res.status(404).json({ success: false, message: 'Attendant not found' });
        }
        res.status(200).json({ success: true, data: attendant });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
