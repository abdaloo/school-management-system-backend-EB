const express = require("express");
const router = express.Router();
const {createEvent,getAllEvent,getSpecificEvent,updateEvent,deleteEvent,uploadEventImage} = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createEvent",authMiddleware,createEvent);
router.post("/uploadEventImage",authMiddleware,uploadEventImage);
router.get("/getAllEvent",authMiddleware,getAllEvent);
router.get("/getSpecificEvent/:id",authMiddleware,getSpecificEvent);
router.put("/updateEvent/:id",authMiddleware,updateEvent);
router.delete("/deleteEvent/:id",authMiddleware,deleteEvent);

module.exports = router;