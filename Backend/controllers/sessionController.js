const mongoose = require("mongoose");
const userSessionModel = require("../Models/userSessionModel");

const createSession = async (req, res) => {
  const sessionKey = Math.floor(100000 + Math.random() * 900000);

  const data = await userSessionModel.find({ host: req.user.name });

  const sessionId = data.length === 0 ? 1 : data.length + 1;

  const createdSession = await userSessionModel.create({
    SessionId: sessionId,
    host: req.user.name,
    key: sessionKey,
    participants: req.body.participants,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });

  res.send(createdSession);
};

const joinSession = async (req, res) => {
  const foundedSession = await userSessionModel.findOne({
    key: req.body.key,
  });

  if (!foundedSession) {
    return res
      .status(401)
      .send("Wrong SessionId provied please check the details correctly");
  } else {
    const currentTime = new Date();

    if (foundedSession.status === "Expired") {
      return res.status(401).send("Session Expired");
    } else if (foundedSession.status === "Scheduled") {
      if (
        currentTime >= foundedSession.startTime &&
        currentTime <= foundedSession.endTime
      ) {
        foundedSession.status = "Active";
        foundedSession.participants.push(req.user.name);
        await foundedSession.save();

        return res.status(200).send("Succesfully joined");
      } else {
        foundedSession.status = "Expired";
        await foundedSession.save();
        return res.status(401).send("Session Expired");
      }
    } else if (foundedSession === "Active") {
      if (currentTime > foundedSession.endTime) {
        foundedSession.status = "Expired";
        await foundedSession.save();
        return res.status(401).send("Session Expired");
      } else {
        foundedSession.participants.push(req.user.name);
        await foundedSession.save();
        return res.status(200).send("Succesfully joined");
      }
    }
  }
};

module.exports = {createSession,joinSession};
