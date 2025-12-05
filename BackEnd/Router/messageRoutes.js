const express = require("express");
const {
  sendMessage,
  getMessagesWithUser,
  deleteMessage,
} = require("../Controller/messageController");


const JWTverify = require("../Middleware/Jwtverify");

const router = express.Router();

// All routes are protected
router.use(JWTverify);

// Send a message
router.post("/", sendMessage);

// Get all messages with a specific user
router.get("/:userId", getMessagesWithUser);

// Delete a message
router.delete("/:id", deleteMessage);

module.exports = router;
