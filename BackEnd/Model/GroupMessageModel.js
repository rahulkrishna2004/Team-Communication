const mongoose = require("mongoose");

const GroupMessageSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const GroupMessageModel = mongoose.model("GroupMessage", GroupMessageSchema);
module.exports = GroupMessageModel;
