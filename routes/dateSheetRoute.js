
const express = require("express");
const router = express.Router();
const {createDateSheet,getAllDateSheets,getSpecificDateSheet,updateDateSheet,deleteDateSheet} = require("../controllers/dateSheetController.js");
const authMiddleware = require("../middleware/authMiddleware");

//Swagger UI Docs dateSheet's Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     DateSheet:
 *       type: object
 *       required:
 *         - classId
 *         - sectionId
 *         - date
 *         - papers
 *       properties:
 *         id:
 *           type: string
 *           description: The date sheet ID
 *         classId:
 *           type: string
 *           description: The class ID
 *         sectionId:
 *           type: string
 *           description: The section ID
 *         date:
 *           type: string
 *           format: date
 *           description: The global date for the date sheet
 *         papers:
 *           type: array
 *           description: Array of exam papers
 *           items:
 *             type: object
 *             required:
 *               - subjectId
 *               - paperDate
 *               - time
 *             properties:
 *               subjectId:
 *                 type: string
 *                 description: The subject ID
 *               paperDate:
 *                 type: string
 *                 format: date
 *                 description: The date of the paper
 *               time:
 *                 type: string
 *                 description: Time range for the paper (e.g., "9 AM to 12 PM")
 *       example:
 *         classId: "6888a31a537e6b3737832024"
 *         sectionId: "688c9363b2eaba12b7f573a9"
 *         date: "2025-08-01"
 *         papers:
 *           - subjectId: "6888982352fbf5d4997f5c19"
 *             paperDate: "2025-08-11"
 *             time: "9 AM to 12 PM"
 *           - subjectId: "6888982952fbf5d4997f5c1b"
 *             paperDate: "2025-08-12"
 *             time: "9 AM to 12 PM"
 */

//Swagger UI Docs Create DateSheet
/**
 * @swagger
 * /api/v0/datesheet/createDateSheet:
 *   post:
 *     summary: Create a new date sheet
 *     tags: [DateSheet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DateSheet'
 *     responses:
 *       201:
 *         description: Date sheet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dateSheet:
 *                   $ref: '#/components/schemas/DateSheet'
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Duplicate date sheet or duplicate subjects
 */
router.post("/createDateSheet",authMiddleware,createDateSheet);

//Swagger UI Docs Get All DateSheets
/**
 * @swagger
 * /api/v0/datesheet/getAllDateSheets:
 *   get:
 *     summary: Get all date sheets
 *     tags: [DateSheet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of date sheets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dateSheets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DateSheet'
 *       401:
 *         description: Unauthorized
 */
router.get("/getAllDateSheets",authMiddleware,getAllDateSheets);

//Swagger UI Docs Get Specific DateSheet
/**
 * @swagger
 * /api/v0/datesheet/getSpecificDateSheet/{id}:
 *   get:
 *     summary: Get a specific date sheet by ID
 *     tags: [DateSheet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The date sheet ID
 *     responses:
 *       200:
 *         description: Date sheet retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dateSheet:
 *                   $ref: '#/components/schemas/DateSheet'
 *                 message:
 *                   type: string
 *       404:
 *         description: Date sheet not found
 *       401:
 *         description: Unauthorized
 */
router.get("/getSpecificDateSheet/:id",authMiddleware,getSpecificDateSheet);

//Swagger UI Docs Update DateSheet
/**
 * @swagger
 * /api/v0/datesheet/updateDateSheet/{id}:
 *   put:
 *     summary: Update a date sheet by ID
 *     tags: [DateSheet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The date sheet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DateSheet'
 *     responses:
 *       200:
 *         description: Date sheet updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dateSheet:
 *                   $ref: '#/components/schemas/DateSheet'
 *                 message:
 *                   type: string
 *       404:
 *         description: Date sheet not found
 *       401:
 *         description: Unauthorized
 */
router.put("/updateDateSheet/:id",authMiddleware,updateDateSheet);

//Swagger UI Docs Delete DateSheet
/**
 * @swagger
 * /api/v0/datesheet/deleteDateSheet/{id}:
 *   delete:
 *     summary: Delete a date sheet by ID
 *     tags: [DateSheet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The date sheet ID
 *     responses:
 *       200:
 *         description: Date sheet deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Date sheet not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/deleteDateSheet/:id",authMiddleware,deleteDateSheet);

module.exports = router;