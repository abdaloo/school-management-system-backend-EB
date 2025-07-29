const express = require("express");
const router = express.Router();
const {createSubject,getAllSubject,getSpecificSubject,updateSubject,deleteSubject} = require("../controllers/subjectController.js");
const authMiddleware = require("../middleware/authMiddleware");

//Create Subject jsdoc comment
router.post("/createSubject",authMiddleware,createSubject);

//GetAllSubject jsdoc comment
router.get("/getAllSubject",authMiddleware,getAllSubject);

//GetSpecificSubject jsdoc comment
router.get("/getSpecificSubject/:id",authMiddleware,getSpecificSubject);

//UpdateSubject jsdoc comment
router.put("/updateSubject/:id",authMiddleware,updateSubject);

//DeleteSubject jsdoc comment
router.delete("/deleteSubject/:id",authMiddleware,deleteSubject);

module.exports = router;