
const express = require("express");
const router = express.Router();
const {createMarks,getAllStudentMarks,getSpecificMarks,updateMarks,deleteMarks} = require("../controllers/addMarksController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

//Swagger UI Docs Marks Assignment Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     MarksAssignment:
 *       type: object
 *       required:
 *         - teacherId
 *         - classId
 *         - subjectId
 *         - section
 *         - date
 *         - students
 *       properties:
 *         teacherId:
 *           type: string
 *           description: The teacher's ID
 *         classId:
 *           type: string
 *           description: The class ID
 *         subjectId:
 *           type: string
 *           description: The subject ID
 *         section:
 *           type: string
 *           description: The section (e.g., "A")
 *         date:
 *           type: string
 *           format: date
 *           description: The date of marks assignment
 *         students:
 *           type: array
 *           description: Array of student marks
 *           items:
 *             type: object
 *             required:
 *               - studentId
 *               - marks
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: The student's ID
 *               marks:
 *                 type: number
 *                 description: Marks assigned to the student
 *       example:
 *         teacherId: "688476b4df52238e5679c36e"
 *         classId: "6888a2f1537e6b3737832012"
 *         subjectId: "688897f552fbf5d4997f5c17"
 *         section: "A"
 *         date: "2025-07-31"
 *         students:
 *           - studentId: "68871de80638693286b8b13f"
 *             marks: 98
 */

//Swagger UI Docs Assign Marks
/**
 * @swagger
 * /api/v0/marks/assignMarks:
 *   post:
 *     summary: Assign marks to students
 *     tags: [Marks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MarksAssignment'
 *     responses:
 *       201:
 *         description: Marks assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 marks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MarksAssignment'
 *       409:
 *         description: Duplicate marks detected
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/assignMarks",authMiddleware,createMarks);

//Swagger UI Docs Get All Student Marks
/**
 * @swagger
 * /api/v0/marks/getStudentMarks:
 *   get:
 *     summary: Get all student marks by date
 *     tags: [Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date to filter marks i.e 2025-07-31
 *     responses:
 *       200:
 *         description: Marks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 marks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MarksAssignment'
 *       404:
 *         description: No marks found for the given date
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get("/getStudentMarks",authMiddleware,getAllStudentMarks);

//Swagger UI Docs Get Specific Marks
/**
 * @swagger
 * /api/v0/marks/getSpecificMarks/{id}:
 *   get:
 *     summary: Get specific marks record by ID
 *     tags: [Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The marks record ID
 *     responses:
 *       200:
 *         description: Marks record fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 marks:
 *                   $ref: '#/components/schemas/MarksAssignment'
 *       404:
 *         description: Marks record not found
 *       400:
 *         description: Bad request */
router.get("/getSpecificMarks/:id",authMiddleware,getSpecificMarks);

//Swagger UI Docs Update Marks
/**
 * @swagger
 * /api/v0/marks/updateMarks/{id}:
 *   put:
 *     summary: Update marks for a student
 *     tags: [Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The marks record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MarksAssignment'
 *     responses:
 *       200:
 *         description: Marks updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 marks:
 *                   $ref: '#/components/schemas/MarksAssignment'
 *       404:
 *         description: Marks record not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/updateMarks/:id",authMiddleware,updateMarks);

//Swagger UI Docs Delete Marks
/**
 * @swagger
 * /api/v0/marks/deleteMarks/{id}:
 *   delete:
 *     summary: Delete marks for a student
 *     tags: [Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The marks record ID
 *     responses:
 *       200:
 *         description: Marks deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 marks:
 *                   $ref: '#/components/schemas/MarksAssignment'
 *       404:
 *         description: Marks record not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.delete("/deleteMarks/:id",authMiddleware,deleteMarks);

module.exports = router;