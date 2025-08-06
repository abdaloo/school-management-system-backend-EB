const express = require("express");
const router = express.Router();
const {submitFee,getAllFee,getSpecificFee,updateFee,deleteFee} = require("../controllers/feeController.js");
const authMiddleware = require("../middleware/authMiddleware");

//Swagger UI Docs Fee's Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     FeeRequest:
 *       type: object
 *       required:
 *         - classId
 *         - sectionId
 *         - studentId
 *         - feeAmount
 *         - dueDate
 *       properties:
 *         classId:
 *           type: string
 *           example: 689325bea1f67c446eb51fd5
 *         sectionId:
 *           type: string
 *           example: 68932707a1f67c446eb51fdb
 *         studentId:
 *           type: string
 *           example: 6891a631eb342568cdd4e733
 *         feeAmount:
 *           type: number
 *           example: 5000
 *         dueDate:
 *           type: string
 *           format: date
 *           example: 2025-08-03
 */

//Swagger UI Docs Submit Fee
/**
 * @swagger
 * /api/v0/fee/submitFee:
 *   post:
 *     summary: Submit student fee
 *     tags: [Fee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeeRequest'
 *     responses:
 *       201:
 *         description: Fee submit successfully
 *       400:
 *         description: Validation error or duplicate fee
 *       500:
 *         description: Error creating fee
 */
router.post("/submitFee",authMiddleware,submitFee);

//Swagger UI Docs Get All Fees
/**
 * @swagger
 * /api/v0/fee/getAllFee:
 *   get:
 *     summary: Get all fees for the authenticated teacher
 *     tags: [Fee]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fee fetched successfully
 *       400:
 *         description: No fee found
 *       500:
 *         description: Error getting fee
 */
router.get("/getAllFee",authMiddleware,getAllFee);

//Swagger UI Docs Get Specific Fee
/**
 * @swagger
 * /api/v0/fee/getSpecificFee/{id}:
 *   get:
 *     summary: Get a specific fee by ID
 *     tags: [Fee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The fee record ID
 *     responses:
 *       200:
 *         description: Fee fetched successfully
 *       400:
 *         description: Fee not found
 *       500:
 *         description: Error getting specific fee
 */
router.get("/getSpecificFee/:id",authMiddleware,getSpecificFee);

//Swagger UI Docs Update Fee
/**
 * @swagger
 * /api/v0/fee/updateFee/{id}:
 *   put:
 *     summary: Update a fee record by ID
 *     tags: [Fee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The fee record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeeRequest'
 *     responses:
 *       200:
 *         description: Fee updated successfully
 *       400:
 *         description: Fee not found
 *       500:
 *         description: Error updating fee
 */
router.put("/updateFee/:id",authMiddleware,updateFee);

//Swagger UI Docs Delete Fee
/**
 * @swagger
 * /api/v0/fee/deleteFee/{id}:
 *   delete:
 *     summary: Delete a fee record by ID
 *     tags: [Fee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The fee record ID
 *     responses:
 *       200:
 *         description: Fee deleted successfully
 *       400:
 *         description: Fee not found
 *       500:
 *         description: Error deleting fee
 */
router.delete("/deleteFee/:id",authMiddleware,deleteFee);

module.exports = router;