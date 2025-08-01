const express = require('express');
const router = express.Router();
const {createSection,getAllSections,getSpecificSection,updateSection,deleteSection} = require("../controllers/sectionController.js");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createSection",authMiddleware,createSection);
router.get("/getAllSections",authMiddleware,getAllSections);
router.get("/getSpecificSection/:id",authMiddleware,getSpecificSection);
router.put("/updateSection/:id",authMiddleware,updateSection);
router.delete("/deleteSection/:id",authMiddleware,deleteSection);

module.exports = router;