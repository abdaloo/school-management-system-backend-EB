const express = require('express');
const app = express();
require('dotenv').config({ quiet: true });
const ConnectDB = require("./config/ConnectDb");
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");


app.use(cors());
app.use(express.json())

ConnectDB();

app.get("/",(req,res)=>{
    res.send("Server is Fine")
})

app.use("/api/v0/user",UserRoute);

// For Vercel: export app instead of listen()
module.exports = app;

// Local development only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });
}