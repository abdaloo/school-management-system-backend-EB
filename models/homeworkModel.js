const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
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
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    section: {
        type: String,
        required: [true,'Section is required'],
        enum: ['A', 'B', 'C', 'D']
    },
    homeworkDetails: {
        type: String,
        required: [true,'Homework details is required']
    },
    dueDate: {
        type: Date,
        required: [true,'Due date is required']
    }
},{timestamps:true});

module.exports = mongoose.model("Homework",homeworkSchema);