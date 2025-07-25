const express = require("express");
const router = express.Router();
const {CreateStudent,GetAllStudent,UpdateStudent,DeleteStudent} = require("../controllers/studentController.js");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createStudent",authMiddleware,CreateStudent);
router.get("/getAllStudent",authMiddleware,GetAllStudent);
router.put("/updateStudent/:id",UpdateStudent);
router.delete("/deleteStudent/:id",DeleteStudent);

module.exports = router;