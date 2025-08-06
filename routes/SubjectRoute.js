
const express = require("express");
const router = express.Router();
const {createSubject,getAllSubject,getSpecificSubject,updateSubject,deleteSubject} = require("../controllers/subjectController.js");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the subject (e.g., "Mathematics")
 *       example:
 *         name: "Mathematics"
 */

/**
 * @swagger
 * /api/v0/subject/createSubject:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       201:
 *         description: Subject created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subject:
 *                   $ref: '#/components/schemas/Subject'
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/createSubject",authMiddleware,createSubject);

/**
 * @swagger
 * /api/v0/subject/getAllSubject:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subjects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subject'
 *       401:
 *         description: Unauthorized
 */
router.get("/getAllSubject",authMiddleware,getAllSubject);

/**
 * @swagger
 * /api/v0/subject/getSpecificSubject/{id}:
 *   get:
 *     summary: Get a specific subject by ID
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subject ID
 *     responses:
 *       200:
 *         description: Subject retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subject:
 *                   $ref: '#/components/schemas/Subject'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Subject not found
 *       401:
 *         description: Unauthorized
 */
router.get("/getSpecificSubject/:id",authMiddleware,getSpecificSubject);

/**
 * @swagger
 * /api/v0/subject/updateSubject/{id}:
 *   put:
 *     summary: Update a subject by ID
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subject ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subject:
 *                   $ref: '#/components/schemas/Subject'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Subject not found
 *       401:
 *         description: Unauthorized
 */
router.put("/updateSubject/:id",authMiddleware,updateSubject);

/**
 * @swagger
 * /api/v0/subject/deleteSubject/{id}:
 *   delete:
 *     summary: Delete a subject by ID
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subject ID
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Subject not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/deleteSubject/:id",authMiddleware,deleteSubject);

module.exports = router;