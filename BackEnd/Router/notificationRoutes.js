const express = require("express");
const {
  getNotifications,
  addNotification,
  markAsRead,
} = require("../Controller/notificationController");

const JWTverify = require("../Middleware/Jwtverify");

const router = express.Router();
router.use(JWTverify);

// Get all notifications of user
router.get("/", getNotifications);

// Add new notification
router.post("/", addNotification);

// Mark notification as read
router.post("/:id/read", markAsRead);

module.exports = router;
