const express = require("express");
const router = express.Router();
const {CreateUser,GetAllUser,LoginUser} = require("../controllers/userController.js");

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


module.exports = router;
