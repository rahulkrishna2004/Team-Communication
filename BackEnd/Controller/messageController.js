const MessageModel = require("../Model/MessageModel");

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user._id; // from JWT middleware

    if (!receiverId || !content) {
      return res.status(400).json({ error: "receiverId and content are required" });
    }

    const message = new MessageModel({ senderId, receiverId, content });
    await message.save();

    res.status(201).json({ message: "Message sent successfully", data: message });
  } catch (error) {
    console.error("Send Message Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all messages between logged-in user and another user
const getMessagesWithUser = async (req, res) => {
  try {
    const userId = req.user._id; // logged-in user
    const otherUserId = req.params.userId;

    const messages = await MessageModel.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 }); // oldest first

    res.status(200).json(messages);
  } catch (error) {
    console.error("Get Messages Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a message (sender only)
const deleteMessage = async (req, res) => {
  try {
    const message = await MessageModel.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    if (message.senderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You can only delete your own messages" });
    }

    await message.deleteOne();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Delete Message Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { sendMessage, getMessagesWithUser, deleteMessage };
