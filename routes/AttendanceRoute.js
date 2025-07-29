const express = require("express");
const router = express.Router();
const { markAttendance, getAttendanceByDate, updateAttendance, deleteAttendance } = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       required:
 *         - date
 *         - attendanceList
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: The date of attendance
 *         attendanceList:
 *           type: array
 *           description: List of student attendance records for the date
 *           items:
 *             type: object
 *             required:
 *               - studentId
 *               - status
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: The ID of the student
 *               status:
 *                 type: string
 *                 enum: [present, absent, leave]
 *                 description: Attendance status for the student
 *       example:
 *         date: "2025-07-29"
 *         attendanceList:
 *           - studentId: "68872042e5fe5958b2fc8f1b"
 *             status: "present"
 *           - studentId: "68871de80638693286b8b13f"
 *             status: "absent"
 *           - studentId: "688705d2f17d853ec454541c"
 *             status: "leave"
 */

/**
 * @swagger
 * /api/v0/attendance/markAttendance:
 *   post:
 *     summary: Mark attendance for a student
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       201:
 *         description: Attendance marked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attendance:
 *                   $ref: '#/components/schemas/Attendance'
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/markAttendance", authMiddleware, markAttendance);

/**
 * @swagger
 * /api/v0/attendance/getAttendanceByDate:
 *   get:
 *     summary: Get attendance records by date
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date to filter attendance records
 *     responses:
 *       200:
 *         description: Attendance records for the specified date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attendance:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get("/getAttendanceByDate", authMiddleware, getAttendanceByDate);

/**
 * @swagger
 * /api/v0/attendance/updateAttendance/{id}:
 *   put:
 *     summary: Update a specific attendance record
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The attendance record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       200:
 *         description: Attendance record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attendance:
 *                   $ref: '#/components/schemas/Attendance'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Attendance record not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/updateAttendance/:id", authMiddleware, updateAttendance);

/**
 * @swagger
 * /api/v0/attendance/deleteAttendance/{id}:
 *   delete:
 *     summary: Delete a specific attendance record
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The attendance record ID
 *     responses:
 *       200:
 *         description: Attendance record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Attendance record not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/deleteAttendance/:id", authMiddleware, deleteAttendance);

module.exports = router;
