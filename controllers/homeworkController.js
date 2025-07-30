const Homework = require("../models/homeworkModel");

exports.createHomework = async (req,res) => {
    try {
        const {classId,subjectId,section,homeworkDetails,dueDate} = req.body;  
        const teacherId = req.user.userId;
        
        if(!classId || !subjectId || !section || !homeworkDetails || !dueDate){
            return res.status(400).json({message:"All fields are required"});
        }

        const newHomework = await Homework.create({teacherId,classId,subjectId,section,homeworkDetails,dueDate});
        if(!newHomework) return res.status(400).json({message:"Homework not created"});

        return res.status(201).json({message:"Homework created successfully", homework: newHomework});
    } catch (error) {
        return res.status(500).json({message:"Error Creating Homework", error:error.message});
    }
}

exports.getAllHomework = async (req,res) => {
    try {
        const getHomework = await Homework.find({teacherId: req.user.userId});
        if(!getHomework) return res.status(400).json({message:"No homework found"});

        return res.status(200).json({message:"Homework fetched successfully", homework: getHomework});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Homework", error:error.message});
    }
}

exports.getSpecificHomework = async (req,res) => {
    try {
        const getSpecificHomework = await Homework.findById(req.params.id);
        if(!getSpecificHomework) return res.status(400).json({message:"Homework not found"});

        return res.status(200).json({message:"Homework fetched successfully", homework: getSpecificHomework});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Specific Homework", error:error.message});
    }
}

exports.updateHomework = async (req,res) => {
    try {
        const id = req.params.id;
        const updateHW = await Homework.findByIdAndUpdate(id,req.body,{new:true}); // HW:- Home Work
        if(!updateHW) return res.status(400).json({message:"Homework not found"});

        return res.status(200).json({message:"Homework updated successfully", homework: updateHW});
    } catch (error) {
        return res.status(500).json({message:"Error Updating Homework", error:error.message});
    }
}

exports.deleteHomework = async (req,res) => {
    try {
        const deleteHW = await Homework.findByIdAndDelete(req.params.id);
        if(!deleteHW) return res.status(400).json({message:"Homework not found"});

        return res.status(200).json({message:"Homework deleted successfully", homework: deleteHW});
    } catch (error) {
        return res.status(500).json({message:"Error Deleting Homework", error:error.message});
    }
}