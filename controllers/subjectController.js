const Subject = require("../models/subjectModel");

exports.createSubject = async (req,res) => {
    try {
        const {name} = req.body;
        const teacherId = req.user.userId;
        const newSubject = await Subject.create({teacherId,name});
        if(!newSubject) return res.status(400).json({message:"Subject not created"});

        return res.status(201).json({message:"Subject created successfully", subject: newSubject});
    } catch (error) {
        return res.status(500).json({message:"Error Creating Subject", error:error.message});
    }
}

exports.getAllSubject = async (req,res) => {
    try {
        const getSubjects = await Subject.find({teacherId: req.user.userId});
        if(!getSubjects) return res.status(400).json({message:"No subjects found"});

        return res.status(200).json({message:"Subjects fetched successfully", subjects: getSubjects});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Subjects", error:error.message});
    }
}

exports.getSpecificSubject = async (req,res) => {
    try {
        const getSpecificSubject = await Subject.findById(req.params.id);
        if(!getSpecificSubject) return res.status(400).json({message:"Subject not found"});

        return res.status(200).json({message:"Subject fetched successfully", subject: getSpecificSubject});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Specific Subject", error:error.message});
    }
}

exports.updateSubject = async (req,res) => {
    try {
        const id = req.params.id;
        const updateSubject = await Subject.findByIdAndUpdate(id,req.body,{new:true});
        if(!updateSubject) return res.status(400).json({message:"Subject not found"});

        return res.status(200).json({message:"Subject updated successfully", subject: updateSubject});
    } catch (error) {
        return res.status(500).json({message:"Error Updating Subject", error:error.message});
    }
}

exports.deleteSubject = async (req,res) => {
    try {
        const id = req.params.id;
        const deleteSubject = await Subject.findByIdAndDelete(id);
        if(!deleteSubject) return res.status(400).json({message:"Subject not found"});

        return res.status(200).json({message:"Subject deleted successfully", subject: deleteSubject});
    } catch (error) {
        return res.status(500).json({message:"Error Deleting Subject", error:error.message});
    }
}
