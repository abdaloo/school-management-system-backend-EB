const express = require("express");
const router = express.Router();
const {createClass,getAllClass,getSpecificClass,updateClass,deleteClass} = require("../controllers/classController.js");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the class (e.g., "10th")
 *       example:
 *         name: "10th"
 */

/**
 * @swagger
 * /api/v0/class/createClass:
 *   post:
 *     summary: Create a new class
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 class:
 *                   $ref: '#/components/schemas/Class'
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/createClass",authMiddleware,createClass);

/**
 * @swagger
 * /api/v0/class/getAllClass:
 *   get:
 *     summary: Get all classes
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 classes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Class'
 *       401:
 *         description: Unauthorized
 */
router.get("/getAllClass",authMiddleware,getAllClass);

/**
 * @swagger
 * /api/v0/class/getSpecificClass/{id}:
 *   get:
 *     summary: Get a specific class by ID
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The class ID
 *     responses:
 *       200:
 *         description: Class retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 class:
 *                   $ref: '#/components/schemas/Class'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Class not found
 *       401:
 *         description: Unauthorized
 */
router.get("/getSpecificClass/:id",authMiddleware,getSpecificClass);

/**
 * @swagger
 * /api/v0/class/updateClass/{id}:
 *   put:
 *     summary: Update a class by ID
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Class updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 class:
 *                   $ref: '#/components/schemas/Class'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Class not found
 *       401:
 *         description: Unauthorized
 */
router.put("/updateClass/:id",authMiddleware,updateClass);

/**
 * @swagger
 * /api/v0/class/deleteClass/{id}:
 *   delete:
 *     summary: Delete a class by ID
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The class ID
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Class not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/deleteClass/:id",authMiddleware,deleteClass);

module.exports = router;