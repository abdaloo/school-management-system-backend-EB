const express = require("express");
const router = express.Router();
const {createHomework,getAllHomework,getSpecificHomework,updateHomework,deleteHomework} = require("../controllers/homeworkController.js");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createHomework",authMiddleware,createHomework);
router.get("/getAllHomework",authMiddleware,getAllHomework);
router.get("/getSpecificHomework/:id",authMiddleware,getSpecificHomework);
router.put("/updateHomework/:id",authMiddleware,updateHomework);
router.delete("/deleteHomework/:id",authMiddleware,deleteHomework);

module.exports = router;