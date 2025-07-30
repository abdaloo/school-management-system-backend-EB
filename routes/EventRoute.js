const express = require("express");
const router = express.Router();
const {createEvent,getAllEvent,getSpecificEvent,updateEvent,deleteEvent,uploadEventImage} = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

//Swagger UI Docs Event's Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - eventDetails
 *         - image
 *       properties:
 *         eventDetails:
 *           type: string
 *           description: Details about the event
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the event image
 *       example:
 *         eventDetails: "Tommorrow is an Event about Beautiful Moments in hills"
 *         image(optional): "https://res.cloudinary.com/dwjo9bhbs/image/upload/v1753857691/n4xzxkcm29cb5cegxgcy.jpg"
 */

//Swagger UI Docs Create Event
/**
 * @swagger
 * /api/v0/event/createEvent:
 *   post:
 *     summary: Create a new event
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/createEvent",authMiddleware,createEvent);

//Swagger UI Docs Upload Event Image
/**
 * @swagger
 * /api/v0/event/uploadEventImage:
 *   post:
 *     summary: Upload an event image
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   format: uri
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/uploadEventImage",authMiddleware,uploadEventImage);

//Swagger UI Docs Get All Events
/**
 * @swagger
 * /api/v0/event/getAllEvent:
 *   get:
 *     summary: Get all events
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       401:
 *         description: Unauthorized
 */
router.get("/getAllEvent",authMiddleware,getAllEvent);

//Swagger UI Docs Get Specific Event
/**
 * @swagger
 * /api/v0/event/getSpecificEvent/{id}:
 *   get:
 *     summary: Get a specific event by ID
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Event not found
 *       401:
 *         description: Unauthorized
 */
router.get("/getSpecificEvent/:id",authMiddleware,getSpecificEvent);

//Swagger UI Docs Update Event
/**
 * @swagger
 * /api/v0/event/updateEvent/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Event not found
 *       401:
 *         description: Unauthorized
 */
router.put("/updateEvent/:id",authMiddleware,updateEvent);

//Swagger UI Docs Delete Event
/**
 * @swagger
 * /api/v0/event/deleteEvent/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Event not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/deleteEvent/:id",authMiddleware,deleteEvent);

module.exports = router;