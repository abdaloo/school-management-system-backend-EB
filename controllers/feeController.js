const Fee = require("../models/feeModel");

exports.submitFee = async (req,res) => {
    try {
        const {classId,sectionId,studentId,feeAmount,dueDate} = req.body;  
        const teacherId = req.user.userId;
        
        if(!classId || !sectionId || !studentId || !feeAmount || !dueDate){
            return res.status(400).json({message:"All fields are required"});
        }

        //Detect Duplicate fee of the same student before creating
        const duplicateFee = await Fee.findOne({studentId, dueDate});
        if(duplicateFee) return res.status(400).json({message:"Fee already submitted for this student on this date"});

        const newFee = await Fee.create({teacherId,classId,sectionId,studentId,feeAmount,dueDate});
        if(!newFee) return res.status(400).json({message:"Fee not created"});

        return res.status(201).json({message:"Fee submit successfully", fee: newFee});
    } catch (error) {
        return res.status(500).json({message:"Error Creating Fee", error:error.message});
    }
}

exports.getAllFee = async (req,res) => {
    try {
        const getFee = await Fee.find({teacherId: req.user.userId});
        if(!getFee) return res.status(400).json({message:"No fee found"});

        return res.status(200).json({message:"Fee fetched successfully", fee: getFee});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Fee", error:error.message});
    }
}

exports.getSpecificFee = async (req,res) => {
    try {
        const getSpecificFee = await Fee.findById(req.params.id);
        if(!getSpecificFee) return res.status(400).json({message:"Fee not found"});

        return res.status(200).json({message:"Fee fetched successfully", fee: getSpecificFee});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Specific Fee", error:error.message});
    }
}

exports.updateFee = async (req,res) => {
    try {
        const id = req.params.id;
        const updateFee = await Fee.findByIdAndUpdate(id,req.body,{new:true});
        if(!updateFee) return res.status(400).json({message:"Fee not found"});

        return res.status(200).json({message:"Fee updated successfully", fee: updateFee});
    } catch (error) {
        return res.status(500).json({message:"Error Updating Fee", error:error.message});
    }
}

exports.deleteFee = async (req,res) => {
    try {
        const deleteFee = await Fee.findByIdAndDelete(req.params.id);
        if(!deleteFee) return res.status(400).json({message:"Fee not found"});

        return res.status(200).json({message:"Fee deleted successfully", fee: deleteFee});
    } catch (error) {
        return res.status(500).json({message:"Error Deleting Fee", error:error.message});
    }
}