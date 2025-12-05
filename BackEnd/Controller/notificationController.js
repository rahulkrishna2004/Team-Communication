const NotificationModel = require("../Model/NotificationModel");

// GET all notifications of logged-in user
const getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({ userId: req.user._id })
      .sort({ createdAt: -1 }); // newest first
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Get Notifications Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// POST add a new notification
const addNotification = async (req, res) => {
  try {
    const { type, content } = req.body;

    if (!type || !content) {
      return res.status(400).json({ error: "Type and content are required" });
    }

    const notification = new NotificationModel({
      userId: req.user._id,
      type,
      content,
    });

    await notification.save();
    res.status(201).json({ message: "Notification added", data: notification });
  } catch (error) {
    console.error("Add Notification Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// PUT mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await NotificationModel.findById(id);

    if (!notification) return res.status(404).json({ error: "Notification not found" });

    // Only the owner can mark as read
    if (notification.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Access denied" });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error("Mark Notification Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getNotifications, addNotification, markAsRead };
