const GroupModel = require("../Model/GroupModel");
const GroupMessageModel = require("../Model/GroupMessageModel");

// Create new group
const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    if (!name || !members || !Array.isArray(members)) {
      return res.status(400).json({ error: "Name and members array are required" });
    }

    // Add the creator as admin automatically
    const group = new GroupModel({
      name,
      members: [...members, req.user._id],
      admin: req.user._id,
    });

    await group.save();
    res.status(201).json({ message: "Group created successfully", group });
  } catch (error) {
    console.error("Create Group Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all groups of the logged-in user
const getGroups = async (req, res) => {
  try {
    const groups = await GroupModel.find({ members: req.user._id });
    res.status(200).json(groups);
  } catch (error) {
    console.error("Get Groups Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all messages of a group
const getGroupMessages = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is member of the group
    const group = await GroupModel.findById(id);
    if (!group || !group.members.includes(req.user._id)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const messages = await GroupMessageModel.find({ groupId: id })
      .populate("senderId", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Get Group Messages Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Send message to group
const sendGroupMessage = async (req, res) => {
  try {
    const { id } = req.params; // group id
    const { content } = req.body;

    const group = await GroupModel.findById(id);
    if (!group || !group.members.includes(req.user._id)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const message = new GroupMessageModel({
      groupId: id,
      senderId: req.user._id,
      content,
    });

    await message.save();
    res.status(201).json({ message: "Message sent to group", data: message });
  } catch (error) {
    console.error("Send Group Message Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Update group (add/remove members) - only admin
const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { members } = req.body;

    const group = await GroupModel.findById(id);
    if (!group) return res.status(404).json({ error: "Group not found" });

    if (group.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Only admin can update the group" });
    }

    if (members && Array.isArray(members)) {
      group.members = [...new Set([...group.members, ...members])]; // add members
    }

    await group.save();
    res.status(200).json({ message: "Group updated successfully", group });
  } catch (error) {
    console.error("Update Group Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete group - only admin
const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await GroupModel.findById(id);

    if (!group) return res.status(404).json({ error: "Group not found" });

    if (group.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Only admin can delete the group" });
    }

    await group.deleteOne();
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Delete Group Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroupMessages,
  sendGroupMessage,
  updateGroup,
  deleteGroup,
};
