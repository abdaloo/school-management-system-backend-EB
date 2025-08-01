const express = require('express');
const app = express();
require('dotenv').config({ quiet: true });
const ConnectDB = require("./config/connectDB");
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");
const StudentRoute = require("./routes/StudentRoute");
const AttendanceRoute = require("./routes/AttendanceRoute");
const SubjectRoute = require("./routes/SubjectRoute");
const ClassRoute = require("./routes/ClassRoute");
const EventRoute = require("./routes/EventRoute");
const HomeworkRoute = require("./routes/HomeworkRoute");
const AddMarksRoute = require("./routes/AddMarksRoute");
const SectionRoute = require("./routes/SectionRoute");

// Swagger setup
const swaggerSpec = require('./appSwagger');

// Middleware
app.use(cors());
app.use(express.json())

// Swagger JSON endpoint
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(swaggerSpec);
});

// Custom Swagger UI HTML template
const swaggerHtml = require('./customUIHTML');

// Swagger UI route with custom HTML
app.get('/api-docs', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(swaggerHtml);
});

// Connect to MongoDB
ConnectDB();

// Health check
app.get("/",(req,res)=>{
    res.send("Server is Fine")
})

// Test endpoint to verify Swagger spec generation
app.get('/test-swagger', (req, res) => {
  try {
    res.json({
      message: 'Swagger spec generated successfully',
      hasSpec: !!swaggerSpec,
      specKeys: Object.keys(swaggerSpec || {}),
      pathsCount: swaggerSpec?.paths ? Object.keys(swaggerSpec.paths).length : 0
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error generating Swagger spec',
      error: error.message
    });
  }
});

// Routes
app.use("/api/v0/user",UserRoute);
app.use("/api/v0/student",StudentRoute);
app.use("/api/v0/attendance",AttendanceRoute);
app.use("/api/v0/subject",SubjectRoute);
app.use("/api/v0/class",ClassRoute);
app.use("/api/v0/event",EventRoute);
app.use("/api/v0/homework",HomeworkRoute);
app.use("/api/v0/marks",AddMarksRoute);
app.use("/api/v0/section",SectionRoute);

// For Vercel: export app instead of listen()
module.exports = app;

// Local development only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });
}