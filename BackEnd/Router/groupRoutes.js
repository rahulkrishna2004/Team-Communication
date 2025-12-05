const express = require("express");
const {
  createGroup,
  getGroups,
  getGroupMessages,
  sendGroupMessage,
  updateGroup,
  deleteGroup,
} = require("../Controller/groupController");

const JWTverify = require("../Middleware/Jwtverify");

const router = express.Router();
router.use(JWTverify);

// Create a new group
router.post("/", createGroup);

// Get all groups of the user
router.get("/", getGroups);

// Get messages of a group
router.get("/:id/messages", getGroupMessages);

// Send message to group
router.post("/:id/messages", sendGroupMessage);

// Update group (add members)
router.put("/:id", updateGroup);

// Delete group
router.delete("/:id", deleteGroup);

module.exports = router;
