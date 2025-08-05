const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
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
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    title: {
        type: String,
        required: true,
        description: 'Title of the quiz'
    },
    description: {
        type: String,
        required: true,
        description: 'Description of the quiz'
    },
    questions: [
        {
        questionText: {
            type: String,
            required: true
        },
        options: [
            {
            optionText: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                default: false
            }
            }
        ],
        marks: {
            type: Number,
            required: true
        }
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);