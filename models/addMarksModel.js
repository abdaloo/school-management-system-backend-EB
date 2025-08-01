const mongoose = require("mongoose");

const addMarksSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true
    },
    marks: {
        type: Number,
        required: [true,'Marks are required']
    },
    date: {
        type: Date,
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model("AddMarks",addMarksSchema);