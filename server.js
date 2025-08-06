const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ConnectDB = require('./config/connectDB');
const swaggerSpec = require('./appSwagger');
const swaggerHtml = require('./customUIHTML');

dotenv.config({ quiet: true });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

// Connect to MongoDB
ConnectDB();

// Dynamic Route Loader
const routes = [
  { path: '/user', module: './routes/UserRoute' },
  { path: '/student', module: './routes/StudentRoute' },
  { path: '/attendance', module: './routes/AttendanceRoute' },
  { path: '/subject', module: './routes/SubjectRoute' },
  { path: '/class', module: './routes/ClassRoute' },
  { path: '/event', module: './routes/EventRoute' },
  { path: '/homework', module: './routes/HomeworkRoute' },
  { path: '/marks', module: './routes/AddMarksRoute' },
  { path: '/section', module: './routes/SectionRoute' },
  { path: '/dateSheet', module: './routes/dateSheetRoute' },
  { path: '/studentPromotion', module: './routes/StudentPromotionRoute' },
  { path: '/quiz', module: './routes/QuizRoute' },
];

// Register Routes
routes.forEach(route => {
  app.use(`/api/v0${route.path}`, require(route.module));
});

// Export app for Vercel
module.exports = app;

// Local Development Server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3004;
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });
}
