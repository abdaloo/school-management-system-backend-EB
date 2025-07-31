const express = require("express");
const router = express.Router();
const {createMarks,getAllStudentMarks,updateMarks,deleteMarks} = require("../controllers/addMarksController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/assignMarks",authMiddleware,createMarks);
router.get("/getStudentMarks",authMiddleware,getAllStudentMarks);
router.put("/updateMarks/:id",authMiddleware,updateMarks);
router.delete("/deleteMarks/:id",authMiddleware,deleteMarks);

module.exports = router;