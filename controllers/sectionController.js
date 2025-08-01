const Section = require("../models/sectionModel");

// Create Section Controller
exports.createSection = async (req,res) => {
    try {
        const {classId,name} = req.body;
        const teacherId = req.user.userId;

        if(!classId || !name) return res.status(400).json({message:"All fields are required"});
        const newSection = await Section.create({teacherId,classId,name});
        if(!newSection) return res.status(400).json({message:"Section not created"});

        return res.status(201).json({message:"Section created successfully", section: newSection});
    } catch (error) {
        return res.status(500).json({message:"Error Creating Section", error:error.message});
    }
}

// Get All Section Controller
exports.getAllSections = async (req,res) => {
    try {
        const getSections = await Section.find({teacherId: req.user.userId});
        if(!getSections) return res.status(400).json({message:"No sections found"});

        return res.status(200).json({message:"Sections fetched successfully", sections: getSections});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Sections", error:error.message});
    }
}

// Get Specific Section Controller
exports.getSpecificSection = async (req,res) => {
    try {
        const getSpecificSection = await Section.findById(req.params.id);
        if(!getSpecificSection) return res.status(400).json({message:"Section not found"});

        return res.status(200).json({message:"Section fetched successfully", section: getSpecificSection});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Specific Section", error:error.message});
    }
}

// Update Section Controller
exports.updateSection = async (req,res) => {
    try {
        const id = req.params.id;
        const updateSection = await Section.findByIdAndUpdate(id,req.body,{new:true});
        if(!updateSection) return res.status(400).json({message:"Section not found"});

        return res.status(200).json({message:"Section updated successfully", section: updateSection});
    } catch (error) {
        return res.status(500).json({message:"Error Updating Section", error:error.message});
    }
}

// Delete Section Controller
exports.deleteSection = async (req,res) => {
    try {
        const id = req.params.id;
        const deleteSection = await Section.findByIdAndDelete(id);
        if(!deleteSection) return res.status(400).json({message:"Section not found"});

        return res.status(200).json({message:"Section deleted successfully", section: deleteSection});
    } catch (error) {
        return res.status(500).json({message:"Error Deleting Section", error:error.message});
    }
}