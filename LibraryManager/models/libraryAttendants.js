const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const libraryAttendantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Attendant name is required'],
        trim: true
    },
    staffId: {
        type: String,
        required: [true, 'Staff ID is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
libraryAttendantSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
libraryAttendantSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const LibraryAttendant = mongoose.model('LibraryAttendant', libraryAttendantSchema);

module.exports = LibraryAttendant;
