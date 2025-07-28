const Student = require("../models/studentModel");
const { upload, uploadToCloudinary } = require("../config/cloudinaryConfig");

exports.CreateStudent = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, classs, section, rollNo, image } =
      req.body;
    const userId = req.user.userId;
    const findStd = await Student.findOne({ name: name, email: email });
    if (findStd)
      return res.status(400).json({ message: "Student already exists" });
    const newStudent = await Student({
      userId: userId,
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      classs: classs,
      section: section,
      rollNo: rollNo,
      image: image,
    });

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email" });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "msg: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number'",
      });
    }

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const saveStudent = await newStudent.save();
    if (!saveStudent)
      return res.status(400).json({ message: "Student not created" });

    return res
      .status(201)
      .json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Creating Student", error: error.message });
  }
};

exports.GetAllStudent = async (req, res) => {
  try {
    const getStudents = await Student.find({ userId: req.user.userId }).select(
      "-confirmPassword"
    );
    if (!getStudents)
      return res.status(400).json({ message: "No students found" });

    return res
      .status(200)
      .json({
        message: "Students fetched successfully",
        students: getStudents,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Getting Students Data", error: error.message });
  }
};

exports.UpdateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateStudent)
      return res.status(400).json({ message: "Student not found" });

    return res
      .status(200)
      .json({
        message: "Student updated successfully",
        student: updateStudent,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Updating Student", error: error.message });
  }
};

exports.DeleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(id);
    if (!deleteStudent)
      return res.status(400).json({ message: "Student not found" });

    return res
      .status(200)
      .json({
        message: "Student deleted successfully",
        student: deleteStudent,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting Student", error: error.message });
  }
};

exports.GetSpecificStudent = async (req, res) => {
  try {
    const GetSpecificStudent = await Student.findById(req.params.id).select(
      "-confirmPassword"
    );
    if (!GetSpecificStudent)
      return res.status(400).json({ message: "Student not found" });

    return res
      .status(200)
      .json({
        message: "Student fetched successfully",
        student: GetSpecificStudent,
      });
  } catch (error) {
    return res
      .status(400)
      .json({
        message: "Error Getting Specific Student",
        error: error.message,
      });
  }
};

// Upload student image to Cloudinary
exports.uploadStudentImage = async (req, res) => {
  try {
    upload.single("image")(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Validate following extensions (case-insensitive)
      const fileName = req.file.originalname || req.file.filename;

      if (!fileName || !/\.(jpg|jpeg|png|webp|svg)$/i.test(fileName)) {
        return res
          .status(400)
          .json({
            message:
              "Only images with extensions .jpg, .jpeg, .png, .webp, .svg are allowed",
          });
      }

      try {
        const result = await uploadToCloudinary(req.file);
        res.status(201).json({
          message: "Image uploaded successfully",
          imageUrl: result.secure_url,
        });
      } catch (cloudErr) {
        console.error("Upload Error:", cloudErr);
        res
          .status(500)
          .json({ message: "Upload failed", error: cloudErr.message });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading image", error: error.message });
  }
};
