const express = require("express");
const router = express.Router();
const {createDateSheet,getAllDateSheets,getSpecificDateSheet,updateDateSheet,deleteDateSheet} = require("../controllers/dateSheetController.js");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createDateSheet",authMiddleware,createDateSheet);
router.get("/getAllDateSheets",authMiddleware,getAllDateSheets);
router.get("/getSpecificDateSheet/:id",authMiddleware,getSpecificDateSheet);
router.put("/updateDateSheet/:id",authMiddleware,updateDateSheet);
router.delete("/deleteDateSheet/:id",authMiddleware,deleteDateSheet);

module.exports = router;