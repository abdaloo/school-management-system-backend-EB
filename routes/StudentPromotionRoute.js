const express = require("express");
const router = express.Router();
const { promoteMultipleStudents } = require("../controllers/studentPromotionController.js");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/promoteMultipleStudents",authMiddleware,promoteMultipleStudents);

module.exports = router;