const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true,'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'password is required']
    },
    role: {
        type: String,
        enum: ['guest', 'student', 'teacher'],
        default: 'guest'
    }
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);