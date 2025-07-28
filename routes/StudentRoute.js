const express = require("express");
const router = express.Router();
const {CreateStudent,GetAllStudent,UpdateStudent,DeleteStudent,GetSpecificStudent} = require("../controllers/studentController.js");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createStudent",authMiddleware,CreateStudent);
router.get("/getAllStudent",authMiddleware,GetAllStudent);
router.get("/getSpecificStudent/:id",authMiddleware,GetSpecificStudent);
router.put("/updateStudent/:id",authMiddleware,UpdateStudent);
router.delete("/deleteStudent/:id",authMiddleware,DeleteStudent);

module.exports = router;