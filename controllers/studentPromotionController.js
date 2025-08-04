const StudentPromotionModel = require("../models/studentPromotionModel");

// Promote multiple students to a new class and section in sequence
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

    // Validate for duplicate studentIds in the array
    const studentIds = students.map(s => String(s.studentId));
    const hasDuplicates = new Set(studentIds).size !== studentIds.length;
    if (hasDuplicates) {
      return res.status(400).json({ message: "Duplicate studentId found in students array." });
    }

    // Prevent promoting the same students to the same class/section more than once
    const alreadyPromoted = await StudentPromotionModel.findOne({
      'students.studentId': { $in: studentIds },
      newClassId,
      newSectionId
    });
    if (alreadyPromoted) {
      return res.status(409).json({ message: "One or more students have already been promoted to this class and section." });
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

// Get all student promotions
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await StudentPromotionModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ status: 200, message: "Student Promotions fetched successfully.", promotions : promotions });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching promotions", error: error.message });
  }
};

// Update a student promotion by ID
exports.updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    // Optionally: Validate for duplicate studentIds if students array is present
    if (updateData.students) {
      const studentIds = updateData.students.map(s => String(s.studentId));
      const hasDuplicates = new Set(studentIds).size !== studentIds.length;
      if (hasDuplicates) {
        return res.status(400).json({ message: "Duplicate studentId found in students array." });
      }
    }
    const updated = await StudentPromotionModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Promotion record not found." });
    }
    return res.status(200).json({ status: 200, message: "Promotion updated successfully.", promotion: updated });
  } catch (error) {
    return res.status(500).json({ message: "Error updating promotion", error: error.message });
  }
};

// Delete a student promotion by ID
exports.deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await StudentPromotionModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Promotion record not found." });
    }
    return res.status(200).json({ status: 200, message: "Promotion deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting promotion", error: error.message });
  }
};