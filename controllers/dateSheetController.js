const DateSheet = require("../models/dateSheetModel");

exports.createDateSheet = async (req, res) => {
  try {
    const { classId, sectionId, date, papers } = req.body;
    const teacherId = req.user.userId;

    if (!classId || !sectionId || !date || !Array.isArray(papers) || papers.length === 0) {
      return res.status(400).json({ message: "All fields are required and papers must be a non-empty array" });
    }

    // Validate each paper entry
    for (const paper of papers) {
      if (!paper.subjectId || !paper.paperDate || !paper.time) {
        return res.status(400).json({ message: "Each paper must have subjectId, paperDate, and time" });
      }
    }

    // Check for duplicate subjects in papers array
    const subjectIds = papers.map(paper => paper.subjectId.toString());
    if (new Set(subjectIds).size !== subjectIds.length) {
      return res.status(409).json({ message: "Duplicate subjects found in papers array." });
    }

    // Check for existing date sheet for same class, section, and date
    const existingDateSheet = await DateSheet.findOne({ classId, sectionId, date });
    if (existingDateSheet) {
      return res.status(409).json({ message: "A date sheet already exists for this class, section, and date." });
    }

    const newDateSheet = await DateSheet.create({ teacherId, classId, sectionId, date, papers });
    if (!newDateSheet) return res.status(400).json({ message: "DateSheet not created" });

    return res.status(201).json({ message: "DateSheet created successfully", dateSheet: newDateSheet });
  } catch (error) {
    return res.status(500).json({ message: "Error Creating DateSheet", error: error.message });
  }
};

exports.getAllDateSheets = async (req, res) => {
  try {
    const getDateSheets = await DateSheet.find({ teacherId: req.user.userId });
    if (!getDateSheets) return res.status(400).json({ message: "No date sheets found" });

    return res.status(200).json({ message: "DateSheets fetched successfully", dateSheets: getDateSheets });
  } catch (error) {
    return res.status(500).json({ message: "Error Getting DateSheets", error: error.message });
  }
};

exports.getSpecificDateSheet = async (req, res) => {
  try {
    const getSpecificDateSheet = await DateSheet.findById(req.params.id);
    if (!getSpecificDateSheet) return res.status(400).json({ message: "DateSheet not found" });

    return res.status(200).json({ message: "DateSheet fetched successfully", dateSheet: getSpecificDateSheet });
  } catch (error) {
    return res.status(500).json({ message: "Error Getting Specific DateSheet", error: error.message });
  }
};

exports.updateDateSheet = async (req, res) => {
  try {
    const id = req.params.id;
    const updateDateSheet = await DateSheet.findByIdAndUpdate(id, req.body, { new: true });
    if (!updateDateSheet) return res.status(400).json({ message: "DateSheet not found" });

    return res.status(200).json({ message: "DateSheet updated successfully", dateSheet: updateDateSheet });
  } catch (error) {
    return res.status(500).json({ message: "Error Updating DateSheet", error: error.message });
  }
};

exports.deleteDateSheet = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteDateSheet = await DateSheet.findByIdAndDelete(id);
    if (!deleteDateSheet) return res.status(400).json({ message: "DateSheet not found" });

    return res.status(200).json({ message: "DateSheet deleted successfully", dateSheet: deleteDateSheet });
  } catch (error) {
    return res.status(500).json({ message: "Error Deleting DateSheet", error: error.message });
  }
};