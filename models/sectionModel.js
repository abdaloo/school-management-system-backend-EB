const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
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
    name: {
        type: String,
        required: [true,'name is required']
    }
},{timestamps:true});

module.exports = mongoose.model("Section",sectionSchema);