const express = require("express");
const router = express.Router();
const { createQuiz, getAllQuiz, getSpecificQuiz, updateQuiz, deleteQuiz } = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/createQuiz", authMiddleware, createQuiz);
router.get("/getAllQuiz", authMiddleware, getAllQuiz);
router.get("/getSpecificQuiz/:id", authMiddleware, getSpecificQuiz);
router.put("/updateQuiz/:id", authMiddleware, updateQuiz);
router.delete("/deleteQuiz/:id", authMiddleware, deleteQuiz);


module.exports = router;