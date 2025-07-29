const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: [true,'name is required']
    }
},{timestamps:true});

module.exports = mongoose.model("Subject",subjectSchema);