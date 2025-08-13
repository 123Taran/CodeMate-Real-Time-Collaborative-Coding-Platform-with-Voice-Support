const express = require("express");
const loginUser = require("../controllers/userController")

const router = express.Router();

// router.post("/register");
router.post("/login",loginUser);
// router.get("/getProfile");



module.exports = router;