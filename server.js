const express = require('express');
const app = express();
require('dotenv').config({ quiet: true });
const PORT = process.env.PORT;
const connectDB = require("./config/connectDB");
const cors = require("cors");
const UserRoutes = require("./routes/UserRoutes")


app.use(cors());
app.use(express.json())

connectDB();

app.get("/",(req,res)=>{
    res.send("Server is Fine")
})

app.use("/api/v0/user",UserRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});