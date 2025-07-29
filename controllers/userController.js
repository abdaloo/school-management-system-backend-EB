const User = require("../models/UserModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config({ quiet: true });

exports.CreateUser = async(req,res) => {
    try {
        const {username,email,password,confirmPassword,role} = req.body;

        if(!username){
            return res.status(400).json({message:'Username is required'});
        }else if(!email){
            return res.status(400).json({message:'Email is required'});
        }else if(!password){
            return res.status(400).json({message:'Password is required'});
        }else if(!confirmPassword){
            return res.status(400).json({message:'Confirm Password is required'});
        }else if(!role){
            return res.status(400).json({message:'Confirm Password is required'});
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)) return res.status(400).json({message:"Invalid email"});

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({message:"msg: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number'"})
        }

        if(password !== confirmPassword) return res.status(400).json({message:"Passwords do not match"});

        const existingUser =  await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"Email already exists"});

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({username,email,password:hashPassword,role});

        return res.status(201).json({message:"User successfully created", user: newUser});
    } catch (error) {
        res.status(500).json({message:"Error Creating User", error:error.message});
    }
}

exports.LoginUser = async(req,res) => {
    try {
        const {username, password} = req.body;

        if(!username) return res.status(400).json({message: "Username is required"});
        if(!password) return res.status(400).json({message: "Password is required"});

        const user = await User.findOne({username});
        if(!user) return res.status(400).json({message: "User not found"});

        const findPassword = await bcrypt.compare(password,user.password);
        if(!findPassword) return res.status(400).json({message:"Password is incorrect"});

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"});

        return res.status(200).json({message:"User Login Successfully", user: user, token:token})
    } catch (error) {
        res.status(500).json({message:"Error Login User", error:error.message})
    }
}

exports.GetAllUser = async(req,res) => {
    try {
       //req.user.name, userId , email 
        const getUsers = await User.find();
        if(!getUsers) return res.status(400).json({message:"No users founds"});

        return res.status(200).json({message:"User fetched successfully", Users:getUsers})
    } catch (error) {
        res.status(500).json({message:"Error Getting Users Data", error:error.message})
    }
}

exports.updateUser = async(req,res) => {
    try {
    const id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true});
    if(!updateUser) return res.status(400).json({message:"User not found"});

    return res.status(200).json({message:"User updated successfully", user:updateUser})
    } catch (error) {
        res.status(500).json({message:"Error Updating User", error:error.message})
    }
}

exports.deleteUser = async(req,res) => {
    try {
        const id = req.params.id;
        const deleteUser = await User.findByIdAndDelete(id);
        if(!deleteUser) return res.status(400).json({message:"User not found"});

        return res.status(200).json({message:"User deleted successfully", user:deleteUser})
    } catch (error) {
        res.status(500).json({message:"Error Deleting User", error:error.message})
    }
}

exports.getSpecificUser = async(req,res) => {
    try {
        const id = req.params.id;
        const getSpecificUser = await User.findById(id);
        if(!getSpecificUser) return res.status(400).json({message:"User not found"});

        return res.status(200).json({message:"User fetched successfully", user:getSpecificUser})
    } catch (error) {
        res.status(500).json({message:"Error Getting Specific User", error:error.message})
    }
}