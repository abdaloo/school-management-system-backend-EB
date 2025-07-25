const express = require("express");
const router = express.Router();
const {CreateUser,GetAllUser,LoginUser,updateUser,deleteUser, getSpecificUser} = require("../controllers/userController.js");

//Swagger UI Docs user's Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         username:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         id: 60c72b2f9b1e8e001c8e4b8a
 *         username: John Doe
 *         email: john@example.com
 *         password: hashedpassword
 *         role: guest
 */

//Create User jsdoc comment
/**
 * @swagger
 * /api/v0/user/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 msg:
 *                   type: string
 *                 Token:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post("/createUser", CreateUser);

//Login User jsdoc comment
/**
 * @swagger
 * /api/v0/user/loginUser:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   $ref: '#/components/schemas/User'
 *                 msg:
 *                   type: string
 *                 Token:
 *                   type: string
 *       404:
 *         description: User not found
 *       402:
 *         description: Password is incorrect
 */
router.post("/loginUser", LoginUser);

//GetAllUser jsdoc comment
/**
 * @swagger
 * /api/v0/user/getAllUser:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get("/getAllUser",GetAllUser);

//Get Specific User jsdoc comment
/**
 * @swagger
 * /api/v0/user/getSpecificUser/{id}:
 *   get:
 *     summary: Retrieve a user by their ID
 *     description: Fetches detailed information about a specific user using their MongoDB ObjectId. Returns the user's profile if found.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: MongoDB ObjectId of the user (24-character hex string)
 *         example: "60c72b2f9b1e8e001c8e4b8a"
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 NewUser:
 *                   $ref: '#/components/schemas/User'
 *                   description: The user's complete profile information
 *                 msg:
 *                   type: string
 *                   example: "User found successfully"
 *                   description: Success message
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User not found"
 *                   description: Error message when user ID doesn't exist
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Invalid user ID format"
 *                   description: Error message when ID format is invalid
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Internal server error"
 *                   description: Error message when server encounters an error
 */
router.get("/getSpecificUser/:id",getSpecificUser);

//Update User jsdoc comment
/**
 * @swagger
 * /api/v0/user/updateUser/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 NewUser:
 *                   $ref: '#/components/schemas/User'
 *                 msg:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.put("/updateUser/:id",updateUser);

//Delete User jsdoc comment
/**
 * @swagger
 * /api/v0/user/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 DeletedUser:
 *                   $ref: '#/components/schemas/User'
 *                 msg:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.delete("/deleteUser/:id",deleteUser);

module.exports = router;