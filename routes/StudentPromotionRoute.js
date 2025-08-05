const express = require("express");
const router = express.Router();
const { promoteMultipleStudents,getAllPromotions,updatePromotion,deletePromotion } = require("../controllers/studentPromotionController.js");
const authMiddleware = require("../middleware/authMiddleware");

//Swagger UI Docs Student Promotion Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     StudentPromotionRequest:
 *       type: object
 *       required:
 *         - teacherId
 *         - students
 *         - newClassId
 *         - newSectionId
 *       properties:
 *         teacherId:
 *           type: string
 *           description: The ID of the teacher promoting the students
 *           example: 6890a842f79e88f257be7467
 *         students:
 *           type: array
 *           description: List of students to promote
 *           items:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: The ID of the student
 *                 example: 6891a6abeb342568cdd4e73b
 *               currentClassId:
 *                 type: string
 *                 description: The current class ID of the student
 *                 example: 6888a30e537e6b3737832020
 *               currentSectionId:
 *                 type: string
 *                 description: The current section ID of the student
 *                 example: 688c4f370510f4aef8f92c61
 *         newClassId:
 *           type: string
 *           description: The new class ID to promote students to
 *           example: 6888a313537e6b3737832022
 *         newSectionId:
 *           type: string
 *           description: The new section ID to promote students to
 *           example: 688c4f730510f4aef8f92c63
 */

//Swagger UI Docs Promote Multiple Students
/**
 * @swagger
 * /promoteMultipleStudents:
 *   post:
 *     summary: Promote multiple students to a new class and section
 *     tags: [StudentPromotion]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentPromotionRequest'
 *     responses:
 *       201:
 *         description: Students promoted successfully
 *       400:
 *         description: Missing or invalid fields
 *       409:
 *         description: One or more students have already been promoted to this class and section
 *       500:
 *         description: Error promoting students
 */
router.post("/promoteMultipleStudents",authMiddleware,promoteMultipleStudents);

//Swagger UI Docs Get All Promotions
/**
 * @swagger
 * /getAllPromotions:
 *   get:
 *     summary: Get all student promotion records
 *     tags: [StudentPromotion]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student Promotions fetched successfully
 *       500:
 *         description: Error fetching promotions
 */
router.get("/getAllPromotions",authMiddleware,getAllPromotions);

//Swagger UI Docs Update Promotion
/**
 * @swagger
 * /updatePromotion/{id}:
 *   put:
 *     summary: Update a student promotion record by ID
 *     tags: [StudentPromotion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The promotion record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentPromotionRequest'
 *     responses:
 *       200:
 *         description: Promotion updated successfully
 *       400:
 *         description: Duplicate studentId found in students array
 *       404:
 *         description: Promotion record not found
 *       500:
 *         description: Error updating promotion
 */
router.put("/updatePromotion/:id",authMiddleware,updatePromotion);

//Swagger UI Docs Delete Promotion
/**
 * @swagger
 * /deletePromotion/{id}:
 *   delete:
 *     summary: Delete a student promotion record by ID
 *     tags: [StudentPromotion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The promotion record ID
 *     responses:
 *       200:
 *         description: Promotion deleted successfully
 *       404:
 *         description: Promotion record not found
 *       500:
 *         description: Error deleting promotion
 */
router.delete("/deletePromotion/:id",authMiddleware,deletePromotion);   


module.exports = router;