const Class = require("../models/classModel");

exports.createClass = async (req,res) => {
    try {
        const {name} = req.body;
        const teacherId = req.user.userId;
        const newClass = await Class.create({teacherId,name});
        if(!newClass) return res.status(400).json({message:"Class not created"});

        return res.status(201).json({message:"Class created successfully", class: newClass});
    } catch (error) {
        return res.status(500).json({message:"Error Creating Class", error:error.message});
    }
}

exports.getAllClass = async (req,res) => {
    try {
        const getClasses = await Class.find({teacherId: req.user.userId});
        if(!getClasses) return res.status(400).json({message:"No classes found"});

        return res.status(200).json({message:"Classes fetched successfully", classes: getClasses});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Classes", error:error.message});
    }
}

exports.getSpecificClass = async (req,res) => {
    try {
        const getSpecificClass = await Class.findById(req.params.id);
        if(!getSpecificClass) return res.status(400).json({message:"Class not found"});

        return res.status(200).json({message:"Class fetched successfully", class: getSpecificClass});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Specific Class", error:error.message});
    }
}

exports.updateClass = async (req,res) => {
    try {
        const id = req.params.id;
        const updateClass = await Class.findByIdAndUpdate(id,req.body,{new:true});
        if(!updateClass) return res.status(400).json({message:"Class not found"});

        return res.status(200).json({message:"Class updated successfully", class: updateClass});
    } catch (error) {
        return res.status(500).json({message:"Error Updating Class", error:error.message});
    }
}

exports.deleteClass = async (req,res) => {
    try {
        const id = req.params.id;
        const deleteClass = await Class.findByIdAndDelete(id);
        if(!deleteClass) return res.status(400).json({message:"Class not found"});

        return res.status(200).json({message:"Class deleted successfully", class: deleteClass});
    } catch (error) {
        return res.status(500).json({message:"Error Deleting Class", error:error.message});
    }
}