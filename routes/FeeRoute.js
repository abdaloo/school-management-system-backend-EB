const express = require("express");
const router = express.Router();
const {submitFee,getAllFee,getSpecificFee,updateFee,deleteFee} = require("../controllers/feeController.js");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/submitFee",authMiddleware,submitFee);
router.get("/getAllFee",authMiddleware,getAllFee);
router.get("/getSpecificFee/:id",authMiddleware,getSpecificFee);
router.put("/updateFee/:id",authMiddleware,updateFee);
router.delete("/deleteFee/:id",authMiddleware,deleteFee);

module.exports = router;