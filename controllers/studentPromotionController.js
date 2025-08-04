const StudentPromotionModel = require("../models/studentPromotionModel");

//sample data for postman
/**
 * Promote multiple students to a new class and section in sequence.
 * Expects req.body to have:
 *   teacherId: ObjectId,
 *   students: [ { studentId, currentClassId, currentSectionId } ],
 *   newClassId: ObjectId,
 *   newSectionId: ObjectId
 */
exports.promoteMultipleStudents = async (req, res) => {
  try {
    const { teacherId, students, newClassId, newSectionId } = req.body;
    if (!teacherId || !Array.isArray(students) || students.length === 0 || !newClassId || !newSectionId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Optionally: Validate for duplicate studentIds in the array
    const studentIds = students.map(s => String(s.studentId));
    const hasDuplicates = new Set(studentIds).size !== studentIds.length;
    if (hasDuplicates) {
      return res.status(400).json({ message: "Duplicate studentId found in students array." });
    }

    // Create the promotion record
    const promotion = new StudentPromotionModel({
      teacherId,
      students,
      newClassId,
      newSectionId
    });
    await promotion.save();

    return res.status(201).json({
      status:201,
      message: "Students promoted successfully.",
      promotedStudents:promotion
    });
  } catch (error) {
    return res.status(500).json({ message: "Error promoting Students", error: error.message });
  }
};