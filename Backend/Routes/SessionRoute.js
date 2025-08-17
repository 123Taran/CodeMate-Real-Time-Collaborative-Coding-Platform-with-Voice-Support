const express = require("express");
const {createSession,joinSession} = require("../controllers/sessionController");
const checkForLogin = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.post("/createSession", checkForLogin, (req, res) => {
  if (!req.isTA) {
    return res.status(401).send("Only Teaching assistan can create Sessions");
  }

  createSession(req,res);
});


router.post("/joinSession", checkForLogin, (req, res) => {
  joinSession(req,res);
});

module.exports = router;
