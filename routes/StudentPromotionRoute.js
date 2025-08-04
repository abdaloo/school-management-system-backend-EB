const express = require("express");
const router = express.Router();
const { promoteMultipleStudents,getAllPromotions,updatePromotion,deletePromotion } = require("../controllers/studentPromotionController.js");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/promoteMultipleStudents",authMiddleware,promoteMultipleStudents);
router.get("/getAllPromotions",authMiddleware,getAllPromotions);
router.put("/updatePromotion/:id",authMiddleware,updatePromotion);
router.delete("/deletePromotion/:id",authMiddleware,deletePromotion);


module.exports = router;