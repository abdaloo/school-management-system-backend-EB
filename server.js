const express = require('express');
const app = express();
require('dotenv').config({ quiet: true });
const PORT = process.env.PORT;
const connectDB = require("./config/connectDB");

connectDB();
app.get("/",(req,res)=>{
    res.send("Server is Fine")
})


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});