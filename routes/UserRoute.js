const express = require("express");
const router = express.Router();
const {CreateUser,GetAllUser,LoginUser} = require("../controllers/Usercontroller.js");

router.post("/createUser", CreateUser);
router.post("/loginUser", LoginUser);
router.get("/getAllUser",GetAllUser);


module.exports = router;
