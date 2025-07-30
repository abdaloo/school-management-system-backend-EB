const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    eventDetails: {
        type: String,
        required: [true,'Event details is required']
    },
    image: {
        type: String,
        required: false
    }
},{timestamps:true});

module.exports = mongoose.model("Event",eventSchema);