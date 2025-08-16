const express = require("express");
<<<<<<< HEAD
const registerUser = require("../controllers/userController")
=======
const {loginUser,registerUser,logoutUser} = require("../controllers/userController")
>>>>>>> newFeatures

const router = express.Router();

router.post("/register",registerUser);
<<<<<<< HEAD
module.exports =router;
=======
router.post("/login",loginUser);
router.post("/logout",logoutUser);



module.exports = router;
>>>>>>> newFeatures
