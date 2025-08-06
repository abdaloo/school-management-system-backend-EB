const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ConnectDB = require('./config/connectDB');

// Routes
const UserRoute = require('./routes/UserRoute');
const StudentRoute = require('./routes/StudentRoute');
const AttendanceRoute = require('./routes/AttendanceRoute');
const SubjectRoute = require('./routes/SubjectRoute');
const ClassRoute = require('./routes/ClassRoute');
const EventRoute = require('./routes/EventRoute');
const HomeworkRoute = require('./routes/HomeworkRoute');
const AddMarksRoute = require('./routes/AddMarksRoute');
const SectionRoute = require('./routes/SectionRoute');
const DateSheetRoute = require('./routes/dateSheetRoute');
const StudentPromotionRoute = require('./routes/StudentPromotionRoute');
const QuizRoute = require('./routes/QuizRoute');

// Swagger
const swaggerSpec = require('./appSwagger');
const swaggerHtml = require('./customUIHTML');

// App Initialization
dotenv.config({ quiet: true });
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
ConnectDB();

// Swagger JSON Endpoint
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(swaggerSpec);
});

// Swagger UI Route
app.get('/api-docs', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(swaggerHtml);
});

// Health Check Route
app.get("/", (req, res) => {
  res.send("Server is Fine");
});

// Test Swagger Spec Endpoint
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

// API Routes Registration (No Loop)
app.use("/api/v0/user", UserRoute);
app.use("/api/v0/student", StudentRoute);
app.use("/api/v0/attendance", AttendanceRoute);
app.use("/api/v0/subject", SubjectRoute);
app.use("/api/v0/class", ClassRoute);
app.use("/api/v0/event", EventRoute);
app.use("/api/v0/homework", HomeworkRoute);
app.use("/api/v0/marks", AddMarksRoute);
app.use("/api/v0/section", SectionRoute);
app.use("/api/v0/dateSheet", DateSheetRoute);
app.use("/api/v0/studentPromotion", StudentPromotionRoute);
app.use("/api/v0/quiz", QuizRoute);

// For Vercel: Export App (No app.listen)
module.exports = app;

// Local Development Only (app.listen)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });
}
