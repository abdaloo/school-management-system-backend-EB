const express = require("express");
const router = express.Router();
const {CreateUser,GetAllUser} = require("../controllers/UserController.js");

router.post("/createUser", CreateUser);
router.get("/getAllUser",GetAllUser);

module.exports = router;