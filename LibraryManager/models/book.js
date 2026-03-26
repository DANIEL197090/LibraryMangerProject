const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema({
    title: {type: String, required: true},
    isbn: {type: String, required: true},
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: "author"}],
    status: {type: String,
        enum: ["IN", "OUT"],
        default: "IN"
    },
    borrowBy: {type: mongoose.Schema.Types.ObjectId},
    issuedBy: {type: mongoose.Schema.Types.ObjectId},
    bio: String,
    dob: String

},
{timestamps: true});