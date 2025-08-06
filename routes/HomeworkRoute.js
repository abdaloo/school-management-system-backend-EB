
const express = require("express");
const router = express.Router();
const {createHomework,getAllHomework,getSpecificHomework,updateHomework,deleteHomework} = require("../controllers/homeworkController.js");
const authMiddleware = require("../middleware/authMiddleware");

//Swagger UI Docs Homework's Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Homework:
 *       type: object
 *       required:
 *         - classId
 *         - subjectId
 *         - section
 *         - homeworkDetails
 *         - dueDate
 *       properties:
 *         classId:
 *           type: string
 *           description: The class ID for the homework
 *         subjectId:
 *           type: string
 *           description: The subject ID for the homework
 *         section:
 *           type: string
 *           description: The section for the homework
 *         homeworkDetails:
 *           type: string
 *           description: Details of the homework assignment
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Due date for the homework
 *       example:
 *         classId: "6888a2de537e6b373783200e"
 *         subjectId: "6888982352fbf5d4997f5c19"
 *         section: "688c4f370510f4aef8f92c61"
 *         homeworkDetails: "Do the home work in English book , page 4"
 *         dueDate: "2025-08-02"
 */

//Swagger UI Docs Create Homework
/**
 * @swagger
 * /api/v0/homework/createHomework:
 *   post:
 *     summary: Create a new homework assignment
 *     tags: [Homework]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Homework'
 *     responses:
 *       201:
 *         description: Homework created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 homework:
 *                   $ref: '#/components/schemas/Homework'
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/createHomework",authMiddleware,createHomework);

//Swagger UI Docs Get All Homework
/**
 * @swagger
 * /api/v0/homework/getAllHomework:
 *   get:
 *     summary: Get all homework assignments
 *     tags: [Homework]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of homework assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 homeworks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Homework'
 *       401:
 *         description: Unauthorized
 */
router.get("/getAllHomework",authMiddleware,getAllHomework);

//Swagger UI Docs Get Specific Homework
/**
 * @swagger
 * /api/v0/homework/getSpecificHomework/{id}:
 *   get:
 *     summary: Get a specific homework assignment by ID
 *     tags: [Homework]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The homework ID
 *     responses:
 *       200:
 *         description: Homework retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 homework:
 *                   $ref: '#/components/schemas/Homework'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Homework not found
 *       401:
 *         description: Unauthorized
 */
router.get("/getSpecificHomework/:id",authMiddleware,getSpecificHomework);

//Swagger UI Docs Update Homework
/**
 * @swagger
 * /api/v0/homework/updateHomework/{id}:
 *   put:
 *     summary: Update a homework assignment by ID
 *     tags: [Homework]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The homework ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Homework'
 *     responses:
 *       200:
 *         description: Homework updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 homework:
 *                   $ref: '#/components/schemas/Homework'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Homework not found
 *       401:
 *         description: Unauthorized
 */
router.put("/updateHomework/:id",authMiddleware,updateHomework);

//Swagger UI Docs Delete Homework
/**
 * @swagger
 * /api/v0/homework/deleteHomework/{id}:
 *   delete:
 *     summary: Delete a homework assignment by ID
 *     tags: [Homework]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The homework ID
 *     responses:
 *       200:
 *         description: Homework deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Homework not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/deleteHomework/:id",authMiddleware,deleteHomework);

module.exports = router;