const Attendance = require("../models/attendanceModel");
const Student = require("../models/studentModel");

// Create attendance for all students of logged-in teacher's class
exports.markAttendance = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const { date, attendanceList } = req.body; // attendanceList: [{ studentId, status }]

    if (!date || !attendanceList) {
      return res
        .status(400)
        .json({ message: "Date and attendance list are required." });
    }

    const [year, month, day] = date.split("-");
    const today = new Date(Date.UTC(year, month - 1, day));

    const createdRecords = [];
    const failedRecords = [];

    for (const record of attendanceList) {
      const student = await Student.findById(record.studentId);

      // Check if student belongs to logged-in teacher
      if (!student || student.userId.toString() !== teacherId) {
        failedRecords.push({
          studentId: record.studentId,
          error: "Not allowed",
        });
        continue;
      }

      try {
        const attendance = new Attendance({
          teacherId,
          studentId: record.studentId,
          date: today,
          status: record.status || "absent",
        });
        await attendance.save();
        createdRecords.push(attendance);
      } catch (err) {
        if (err.code === 11000) {
          failedRecords.push({
            studentId: record.studentId,
            error: "Attendance already marked",
          });
        } else {
          failedRecords.push({
            studentId: record.studentId,
            error: err.message,
          });
        }
      }
    }

    res
      .status(201)
      .json({ message: "Attendance processed", createdRecords, failedRecords });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get attendance of a specific date for teacher's class
exports.getAttendanceByDate = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const { date } = req.query;

    const [year, month, day] = date.split("-");
    const today = new Date(Date.UTC(year, month - 1, day));
    const attendance = await Attendance.find({
      teacherId,
      date: today,
    }).populate("studentId", "name rollNo");

    res.status(200).json(attendance);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch attendance", error: error.message });
  }
};

// Update attendance
exports.updateAttendance = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const attendanceId = req.params.id;
    const { status } = req.body;

    const attendance = await Attendance.findOne({
      _id: attendanceId,
      teacherId,
    });
    if (!attendance) {
      return res
        .status(404)
        .json({ message: "Attendance not found or not allowed" });
    }

    attendance.status = status;
    await attendance.save();

    res.status(200).json({ message: "Attendance updated", attendance });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Delete attendance
exports.deleteAttendance = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const attendanceId = req.params.id;

    const attendance = await Attendance.findOneAndDelete({
      _id: attendanceId,
      teacherId,
    });

    if (!attendance) {
      return res
        .status(404)
        .json({ message: "Attendance not found or not allowed" });
    }

    res.status(200).json({ message: "Attendance deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
