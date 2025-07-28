const express = require("express");
const router = express.Router();
const { markAttendance, getAttendanceByDate, updateAttendance, deleteAttendance } = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/markAttendance", authMiddleware, markAttendance);// Mark attendance (only logged-in teachers can access)
router.get("/getAttendanceByDate", authMiddleware, getAttendanceByDate);// Get attendance by date
router.put("/updateAttendance/:id", authMiddleware, updateAttendance);// Update specific attendance record
router.delete("/deleteAttendance/:id", authMiddleware, deleteAttendance);// Delete attendance

module.exports = router;
