const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management System API Documentation",
      version: "1.0.0",
      description:
        "Welcome to the School Management System API!\n\nThis interactive documentation provides a comprehensive overview of all endpoints for the School Management System platform. Easily manage user accounts, authentication and more with clear request and response examples.\n\nExplore, test, and integrate with confidence.",
    },
    servers: [
      {
        url: "https://school-management-system-eb-backend.vercel.app",
        description: "Production server"
      },
      {
        url: "http://localhost:3004",
        description: "Development server"
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT Bearer token in format: Bearer <token>"
        }
      }
    },
    // security: [ { bearerAuth: [] } ],// This enable all endpoints to be protected by JWT token globally.
  },
  apis: [
    "./routes/UserRoute.js",
    "./routes/StudentRoute.js",
    "./routes/AttendanceRoute.js",
    "./routes/ClassRoute.js",
    "./routes/SubjectRoute.js",
    "./routes/EventRoute.js",
    "./routes/HomeworkRoute.js",
    "./routes/AddMarksRoute.js",
    "./routes/SectionRoute.js",
    "./routes/dateSheetRoute.js"
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
// console.log(JSON.stringify(swaggerSpec, null, 2)); // Uncomment to view the generated spec in the console
module.exports = swaggerSpec;
