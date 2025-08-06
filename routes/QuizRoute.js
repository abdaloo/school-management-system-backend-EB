const express = require("express");
const router = express.Router();
const { createQuiz, getAllQuiz, getSpecificQuiz, updateQuiz, deleteQuiz } = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware.js");

//Swagger UI Docs Quiz's Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     QuizRequest:
 *       type: object
 *       required:
 *         - classId
 *         - sectionId
 *         - subjectId
 *         - title
 *         - description
 *         - questions
 *       properties:
 *         classId:
 *           type: string
 *           example: 6888a313537e6b3737832022
 *         sectionId:
 *           type: string
 *           example: 688c4f730510f4aef8f92c63
 *         subjectId:
 *           type: string
 *           example: 6891e234b2e6176600c948fc
 *         title:
 *           type: string
 *           example: General Science Quiz
 *         description:
 *           type: string
 *           example: A quiz to test basic science knowledge.
 *         questions:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - questionText
 *               - options
 *               - marks
 *             properties:
 *               questionText:
 *                 type: string
 *                 example: What is the boiling point of water?
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - optionText
 *                     - isCorrect
 *                   properties:
 *                     optionText:
 *                       type: string
 *                       example: 100°C
 *                     isCorrect:
 *                       type: boolean
 *                       example: true
 *               marks:
 *                 type: number
 *                 example: 2
 */

//Swagger UI Docs Create Quiz
/**
 * @swagger
 * /api/v0/quiz/createQuiz:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - classId
 *               - sectionId
 *               - subjectId
 *               - title
 *               - description
 *               - questions
 *             properties:
 *               classId:
 *                 type: string
 *                 example: 6888a313537e6b3737832022
 *               sectionId:
 *                 type: string
 *                 example: 688c4f730510f4aef8f92c63
 *               subjectId:
 *                 type: string
 *                 example: 6891e234b2e6176600c948fc
 *               title:
 *                 type: string
 *                 example: General Science Quiz
 *               description:
 *                 type: string
 *                 example: A quiz to test basic science knowledge.
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *                       example: What is the boiling point of water?
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           optionText:
 *                             type: string
 *                             example: 100°C
 *                           isCorrect:
 *                             type: boolean
 *                             example: true
 *                     marks:
 *                       type: number
 *                       example: 2
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Error creating quiz
 */
router.post("/createQuiz", authMiddleware, createQuiz);

//Swagger UI Docs Get All Quizzes
/**
 * @swagger
 * /api/v0/quiz/getAllQuiz:
 *   get:
 *     summary: Get all quizzes for the authenticated teacher
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of quizzes
 *       500:
 *         description: Error fetching quizzes
 */
router.get("/getAllQuiz", authMiddleware, getAllQuiz);

//Swagger UI Docs Get Specific Quiz
/**
 * @swagger
 * /api/v0/quiz/getSpecificQuiz/{id}:
 *   get:
 *     summary: Get a specific quiz by ID
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The quiz ID
 *     responses:
 *       200:
 *         description: Quiz details
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Error fetching quiz
 */
router.get("/getSpecificQuiz/:id", authMiddleware, getSpecificQuiz);

//Swagger UI Docs Update Quiz
/**
 * @swagger
 * /api/v0/quiz/updateQuiz/{id}:
 *   put:
 *     summary: Update a quiz by ID
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The quiz ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           optionText:
 *                             type: string
 *                           isCorrect:
 *                             type: boolean
 *                     marks:
 *                       type: number
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Error updating quiz
 */
router.put("/updateQuiz/:id", authMiddleware, updateQuiz);

//Swagger UI Docs Delete Quiz
/**
 * @swagger
 * /api/v0/quiz/deleteQuiz/{id}:
 *   delete:
 *     summary: Delete a quiz by ID
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The quiz ID
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Error deleting quiz
 */
router.delete("/deleteQuiz/:id", authMiddleware, deleteQuiz);

module.exports = router;