const mongoose = require("mongoose");

const student_Schema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type:String,
        required: [true,'name is required']
    },
    email: {
        type:String,
        required: [true,'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'password is required']
    },
    confirmPassword: {
        type: String,
        required: [true,'confirmPassword is required']
    },
    classs: {
        type: String,
        required: [true,'class is required'],
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: false
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true
    },
    rollNo: {
        type: Number,
        required: [true,'rollNo is required'],
        unique: true
    },
    image: {
        type: String,  // This will store the image URL/path
        required: [true, 'Student image is required']
    },

},{timestamps:true});

module.exports = mongoose.model("Student",student_Schema);