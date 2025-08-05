const Quiz = require("../models/quizModel");

exports.createQuiz = async (req, res) => {
  try {
    const { classId, sectionId, subjectId, title, description, questions } = req.body;
    const teacherId = req.user.userId;

    if (
      !classId ||
      !sectionId ||
      !subjectId ||
      !title ||
      !description ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res.status(400).json({ message: "classId, sectionId, subjectId, title, description, and questions are required." });
    }

    // Validate each question entry
    for (const question of questions) {
      if (
        !question.questionText ||
        !Array.isArray(question.options) ||
        question.options.length < 2 ||
        typeof question.marks !== "number"
      ) {
        return res.status(400).json({ message: "Each question must have questionText, at least two options, and marks." });
      }
      // Validate each option
      for (const option of question.options) {
        if (!option.optionText || typeof option.isCorrect!=="boolean") {
          return res.status(400).json({ message: "Each option must have optionText and isCorrect (boolean)." });
        }
      }
    }

    const newQuiz = await Quiz.create({
      teacherId,
      classId,
      sectionId,
      subjectId,
      title,
      description,
      questions
    });

    return res.status(201).json({ status: 201, message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    return res.status(500).json({ message: "Error creating quiz", error: error.message });
  }
}

exports.getAllQuiz = async (req, res) => {
    try {
        const getQuiz = await Quiz.find({teacherId: req.user.userId});
        if(!getQuiz) return res.status(400).json({message:"No quiz found"});

        return res.status(200).json({message:"Quiz fetched successfully", quiz: getQuiz});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Quiz", error:error.message});
    }
}

exports.getSpecificQuiz = async (req, res) => {
    try {
        const getSpecificQuiz = await Quiz.findById(req.params.id);
        if(!getSpecificQuiz) return res.status(400).json({message:"Quiz not found"});

        return res.status(200).json({message:"Quiz fetched successfully", quiz: getSpecificQuiz});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Specific Quiz", error:error.message});
    }
}

exports.updateQuiz = async (req, res) => {
    try {
        const id = req.params.id;
        const updateQuiz = await Quiz.findByIdAndUpdate(id,req.body,{new:true});
        if(!updateQuiz) return res.status(400).json({message:"Quiz not found"});

        return res.status(200).json({message:"Quiz updated successfully", quiz: updateQuiz});
    } catch (error) {
        return res.status(500).json({message:"Error Updating Quiz", error:error.message});
    }
}

exports.deleteQuiz = async (req, res) => {
    try {
        const deleteQuiz = await Quiz.findByIdAndDelete(req.params.id);
        if(!deleteQuiz) return res.status(400).json({message:"Quiz not found"});

        return res.status(200).json({message:"Quiz deleted successfully", quiz: deleteQuiz});
    } catch (error) {
        return res.status(500).json({message:"Error Deleting Quiz", error:error.message});
    }
}