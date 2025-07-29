const express = require("express");
const router = express.Router();
const {createClass,getAllClass,getSpecificClass,updateClass,deleteClass} = require("../controllers/classController.js");
const authMiddleware = require("../middleware/authMiddleware");

//Create Class jsdoc comment
router.post("/createClass",authMiddleware,createClass);

//GetAllClass jsdoc comment
router.get("/getAllClass",authMiddleware,getAllClass);

//GetSpecificClass jsdoc comment
router.get("/getSpecificClass/:id",authMiddleware,getSpecificClass);

//UpdateClass jsdoc comment
router.put("/updateClass/:id",authMiddleware,updateClass);

//DeleteClass jsdoc comment
router.delete("/deleteClass/:id",authMiddleware,deleteClass);

module.exports = router;