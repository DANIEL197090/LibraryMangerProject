const Student = require('../models/Student');

// @desc    Create Student
// @route   POST /api/v1/students
// @access  Private
exports.createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({ success: true, data: student });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Student ID or Email already exists' });
        }
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get All Students
// @route   GET /api/v1/students
// @access  Public
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, count: students.length, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Single Student
// @route   GET /api/v1/students/:id
// @access  Public
exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
