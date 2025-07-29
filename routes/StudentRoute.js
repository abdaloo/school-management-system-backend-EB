
const express = require("express");
const router = express.Router();
const {CreateStudent,GetAllStudent,UpdateStudent,DeleteStudent,GetSpecificStudent,uploadStudentImage} = require("../controllers/studentController.js");
const authMiddleware = require("../middleware/authMiddleware");

//Swagger UI Docs student's Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - userId
 *         - name
 *         - email
 *         - password
 *         - confirmPassword
 *         - classs
 *         - classId
 *         - section
 *         - rollNo
 *         - image
 *       properties:
 *         userId:
 *           type: string
 *           description: The unique user ID for the student
 *         name:
 *           type: string
 *           description: Student's full name
 *         email:
 *           type: string
 *           format: email
 *           description: Student's email address
 *         password:
 *           type: string
 *           description: Student's password
 *         confirmPassword:
 *           type: string
 *           description: Confirmation of the student's password
 *         classs:
 *           type: string
 *           description: The class/grade of the student
 *         classId:
 *           type: string
 *           description: The unique class ID
 *         section:
 *           type: string
 *           description: The section of the class
 *         rollNo:
 *           type: integer
 *           description: The roll number of the student
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the student's image
 *       example:
 *         userId: "688476b4df52238e5679c36e"
 *         name: "Abdal Khan"
 *         email: "abdalkhan123@gmail.com"
 *         password: "Abdal123"
 *         confirmPassword: "Abdal123"
 *         classs: "10th Grade"
 *         classId: "64f8d3e9f91a5b2a88c88f12"
 *         section: "C"
 *         rollNo: 12
 *         image: "https://res.cloudinary.com/dwjo9bhbs/image/upload/v1753684727/hs3gppqftoimxhzexnfo.jpg"
 */

//Create Student jsdoc comment
/**
 * @swagger
 * /api/v0/student/createStudent:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post("/createStudent",authMiddleware,CreateStudent);

//UploadStudentImage jsdoc comment
/**
 * @swagger
 * /api/v0/student/uploadImage:
 *   post:
 *     summary: Upload a student image
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   format: uri
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/uploadImage',authMiddleware, uploadStudentImage);

//GetAllStudent jsdoc comment
/**
 * @swagger
 * /api/v0/student/getAllStudent:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 students:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized
 */
router.get("/getAllStudent",authMiddleware,GetAllStudent);

//GetSpecificStudent jsdoc comment
/**
 * @swagger
 * /api/v0/student/getSpecificStudent/{id}:
 *   get:
 *     summary: Get a specific student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized
 */
router.get("/getSpecificStudent/:id",authMiddleware,GetSpecificStudent);

//UpdateStudent jsdoc comment
/**
 * @swagger
 * /api/v0/student/updateStudent/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized
 */
router.put("/updateStudent/:id",authMiddleware,UpdateStudent);

//DeleteStudent jsdoc comment
/**
 * @swagger
 * /api/v0/student/deleteStudent/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/deleteStudent/:id",authMiddleware,DeleteStudent);

module.exports = router;