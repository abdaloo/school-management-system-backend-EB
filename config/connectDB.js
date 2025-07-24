const mongoose = require("mongoose");
require("dotenv").config({quiet:true});

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB successfully connected to Server");
    } catch (error) {
        console.error("MongoDB Connection Error", error.message);
    }
};

module.exports = connectDB;