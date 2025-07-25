const User = require("../models/UserModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            "qweryouiljkhgf)(*&^%$",
            {expiresIn: "1d"});

        return res.status(200).json({message:"User Login Successfully", user: user, token:token})
    } catch (error) {
        res.status(500).json({message:"Error Login User", error:error.message})
    }
}

exports.GetAllUser = async(req,res) => {
    try {
        const getUsers = await User.find();
        if(!getUsers) return res.status(400).json({message:"No users founds"});

        return res.status(200).json({message:"User fetched successfully", Users:getUsers})
    } catch (error) {
        res.status(500).json({message:"Error Getting Users Data", error:error.message})
    }
}