const mongoose = require("mongoose");


const dateSheetSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: true,
    description: 'Global date for the date sheet (e.g., when the date sheet is published)'
  },
  papers: [
    {
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
      },
      paperDate: {
        type: Date,
        required: true
      },
      time: {
        type: String,
        required: true,
        description: 'Time range for the paper, e.g., "9 AM to 12 PM"'
      }
    }
  ]
},{timestamps:true});

module.exports = mongoose.model("DateSheet",dateSheetSchema);