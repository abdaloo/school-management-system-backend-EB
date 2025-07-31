
const AddMarks = require("../models/addMarksModel");

// Create Marks Controller
// Adds a new marks record for a student
exports.createMarks = async (req, res) => {
  try {
    const {
      teacherId,
      classId,
      subjectId,
      section,
      date,
      students // Array of { studentId, marks }
    } = req.body;

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "students array is required" });
    }

    // Prevent duplicate marks for same student, subject, section, and date
    const duplicateChecks = await Promise.all(students.map(student =>
      AddMarks.findOne({
        teacherId,
        classId,
        subjectId,
        section,
        date,
        studentId: student.studentId
      })
    ));

    const duplicates = duplicateChecks.filter(doc => !!doc);
    if (duplicates.length > 0) {
      return res.status(409).json({
        message: "Duplicate marks detected. One or more students already have marks for this subject, section, and date.",
        duplicates: duplicates.map(doc => ({ studentId: doc.studentId, marks: doc.marks }))
      });
    }

    // Prepare bulk documents
    const marksDocs = students.map(student => ({
      teacherId,
      classId,
      subjectId,
      section,
      date,
      studentId: student.studentId,
      marks: student.marks
    }));

    // Insert many marks at once
    const savedMarks = await AddMarks.insertMany(marksDocs);

    res.status(201).json({
      message: "Marks added successfully",
      marks: savedMarks
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add marks",
      error: error.message
    });
  }
};

// Get Marks Controller
// Get all student marks by date
exports.getAllStudentMarks = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "date query parameter is required" });
    }

    // Find marks by date
    const getMarks = await AddMarks.find({ date });
    if (!getMarks || getMarks.length === 0) {
      return res.status(404).json({ message: "No marks found for the given date" });
    }

    return res.status(200).json({ message: "Marks fetched successfully", marks: getMarks });
  } catch (error) {
    return res.status(500).json({ message: "Error Getting Marks", error: error.message });
  }
};


// Update Marks Controller
// Updates marks for a specific record by ID
exports.updateMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedMarks = await AddMarks.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedMarks) {
      return res.status(404).json({ message: "Marks record not found" });
    }

    res.status(200).json({
      message: "Marks updated successfully",
      marks: updatedMarks
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update marks",
      error: error.message
    });
  }
};

// Delete Marks Controller
// Deletes marks for a specific record by ID
exports.deleteMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMarks = await AddMarks.findByIdAndDelete(id);
    if (!deletedMarks) {
      return res.status(404).json({ message: "Marks record not found" });
    }

    res.status(200).json({
      message: "Marks deleted successfully",
      marks: deletedMarks
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete marks",
      error: error.message
    });
  }
};

