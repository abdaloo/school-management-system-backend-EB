
const express = require('express');
const router = express.Router();
const {createSection,getAllSections,getSpecificSection,updateSection,deleteSection} = require("../controllers/sectionController.js");
const authMiddleware = require("../middleware/authMiddleware");

//Swagger UI Docs section's Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Section:
 *       type: object
 *       required:
 *         - classId
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The section ID
 *         classId:
 *           type: string
 *           description: The class ID this section belongs to
 *         name:
 *           type: string
 *           description: The section name (e.g., "E")
 *       example:
 *         id: "64f8d3e9f91a5b2a88c88f12"
 *         classId: "6888a301537e6b373783201a"
 *         name: "E"
 */

//Swagger UI Docs Create Section
/**
 * @swagger
 * /api/v0/section/createSection:
 *   post:
 *     summary: Create a new section
 *     tags: [Section]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Section'
 *     responses:
 *       201:
 *         description: Section created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 section:
 *                   $ref: '#/components/schemas/Section'
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/createSection",authMiddleware,createSection);

//Swagger UI Docs Get All Sections
/**
 * @swagger
 * /api/v0/section/getAllSections:
 *   get:
 *     summary: Get all sections
 *     tags: [Section]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sections
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sections:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Section'
 *       401:
 *         description: Unauthorized
 */
router.get("/getAllSections",authMiddleware,getAllSections);

//Swagger UI Docs Get Specific Section
/**
 * @swagger
 * /api/v0/section/getSpecificSection/{id}:
 *   get:
 *     summary: Get a specific section by ID
 *     tags: [Section]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The section ID
 *     responses:
 *       200:
 *         description: Section retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 section:
 *                   $ref: '#/components/schemas/Section'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Section not found
 *       401:
 *         description: Unauthorized
 */
router.get("/getSpecificSection/:id",authMiddleware,getSpecificSection);

//Swagger UI Docs Update Section
/**
 * @swagger
 * /api/v0/section/updateSection/{id}:
 *   put:
 *     summary: Update a section by ID
 *     tags: [Section]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The section ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Section'
 *     responses:
 *       200:
 *         description: Section updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 section:
 *                   $ref: '#/components/schemas/Section'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Section not found
 *       401:
 *         description: Unauthorized
 */
router.put("/updateSection/:id",authMiddleware,updateSection);

//Swagger UI Docs Delete Section
/**
 * @swagger
 * /api/v0/section/deleteSection/{id}:
 *   delete:
 *     summary: Delete a section by ID
 *     tags: [Section]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The section ID
 *     responses:
 *       200:
 *         description: Section deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Section not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/deleteSection/:id",authMiddleware,deleteSection);

module.exports = router;