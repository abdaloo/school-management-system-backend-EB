const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
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
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    feeAmount: {
        type: Number,
        required: [true,'Fee amount is required']
    },
    dueDate: {
        type: Date,
        required: [true,'Due date is required']
    }
},{timestamps:true});

module.exports = mongoose.model("Fee",feeSchema);