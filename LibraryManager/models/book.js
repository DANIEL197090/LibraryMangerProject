const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema({
    title: {type: String, required: true},
    isbn: {type: String, required: true},
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: "author"}],
    status: {type: String,
        enum: ["IN", "OUT"],
        default: "IN"
    },
    borrowBy: {type: mongoose.Schema.Types.ObjectId, ref: "student"},
    issuedBy: {type: mongoose.Schema.Types.ObjectId, ref: "attendant"},
    returnDate: {type: String, default: null},

},
{timestamps: true});