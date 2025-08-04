const mongoose = require("mongoose");


const studentPromotionSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  students: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
      },
      currentClassId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
      },
      currentSectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true
      }
    }
  ],
  newClassId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },
  newSectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true
  }
},{timestamps:true});

module.exports = mongoose.model("StudentPromotion",studentPromotionSchema);