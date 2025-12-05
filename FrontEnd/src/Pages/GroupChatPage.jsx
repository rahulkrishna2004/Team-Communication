import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { Plus, Send, Users, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MainNavbar from "../NavBar/MainNavbar";
import SlideBar from "../NavBar/SlideBar";

const GroupChatPage = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch groups
  const fetchGroups = async () => {
    try {
      const res = await axiosInstance.get("/group");
      setGroups(res.data);
    } catch (err) {
      console.error("Error fetching groups", err);
    }


  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/user");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  // Fetch messages
  const fetchMessages = async (groupId) => {
    try {
      const res = await axiosInstance.get(`/group/${groupId}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!selectedGroup || !messageText.trim()) return;

    const newMessage = {
      _id: Date.now(),
      content: messageText,
      isMine: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");

    try {
      await axiosInstance.post(`/group/${selectedGroup._id}/messages`, {
        content: messageText,
      });
      fetchMessages(selectedGroup._id);
    } catch (err) {
      console.error("Error sending message", err);
      setMessages((prev) => prev.filter((m) => m._id !== newMessage._id));
    }
  };

  // File Upload Handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedGroup) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosInstance.post(`/group/${selectedGroup._id}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully ✅");
      fetchMessages(selectedGroup._id);
    } catch (err) {
      console.error("File upload failed:", err);
      alert("File upload failed ❌");
    } finally {
      e.target.value = "";
    }
  };

  // Create new group
  const createGroup = async () => {
    if (!groupName.trim() || selectedUsers.length === 0) {
      alert("Enter group name and select members.");
      return;
    }

    try {
      await axiosInstance.post("/group", {
        name: groupName,
        members: selectedUsers,
      });
      setShowModal(false);
      setGroupName("");
      setSelectedUsers([]);
      fetchGroups();
    } catch (err) {
      console.error("Error creating group", err);
    }
  };

  const toggleUserSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) fetchMessages(selectedGroup._id);
  }, [selectedGroup]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="md:px-5 px-2">
        {/* Navbar */}
        <div className="relative w-full md:px-10 px-5 py-5 md:py-8">
          <MainNavbar />
        </div>

        <div className="flex min-h-120 bg-gradient-to-br from-purple-50 to-indigo-100">
          {/* Sidebar */}
          <div className="w-[80px] md:w-[250px] h-full">
            <SlideBar />
          </div>

          {/* Main Layout */}
          <div className="flex-1 flex flex-col h-140 bg-gray-50 rounded-tl-3xl shadow-inner overflow-hidden">
            <div className="flex h-[calc(100vh-100px)] overflow-hidden">
              {/* Left: Group List */}
              <motion.div
                className="w-1/3 min-w-[280px] max-w-sm bg-white flex flex-col shadow-xl border-r border-gray-200"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-extrabold text-purple-700 flex items-center gap-2">
                    <Users size={24} className="text-purple-500" /> Groups
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      fetchUsers();
                    }}
                    className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition duration-200 transform hover:scale-105"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="space-y-2 overflow-y-auto flex-1 p-4">
                  <AnimatePresence>
                    {groups.length > 0 ? (
                      groups.map((g) => (
                        <motion.div
                          key={g._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setSelectedGroup(g)}
                          className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                            selectedGroup?._id === g._id
                              ? "bg-purple-50 border-l-4 border-purple-500 shadow-md"
                              : "bg-white hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          <div className="w-10 h-10 bg-purple-200 text-purple-700 flex items-center justify-center rounded-full font-bold text-sm shadow-inner">
                            {g.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 truncate">
                              {g.name}
                            </h3>
                            <p className="text-xs text-gray-500 flex items-center">
                              <Users size={12} className="mr-1" />
                              {g.members?.length || 0} Members
                            </p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm text-center mt-6">
                        No groups yet. Click "+" to start one!
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Right: Chat Section */}
              <div className="flex-1 flex flex-col min-h-0">
                {selectedGroup ? (
                  <>
                    {/* Header */}
                    <div className="p-4 bg-white shadow-md sticky top-0 z-10">
                      <h2 className="text-xl font-bold text-gray-800">
                        {selectedGroup.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {selectedGroup.members?.length || 0} Participants
                      </p>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                      <AnimatePresence>
                        {messages.map((msg, index) => (
                          <motion.div
                            key={msg._id || `${msg.content}-${index}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${
                              msg.isMine ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div className="max-w-md">
                              {!msg.isMine && (
                                <p className="text-xs font-medium text-gray-600 mb-1">
                                  {msg.sender?.name || "Member"}
                                </p>
                              )}
                              <div
                                className={`p-3 rounded-3xl shadow-sm transition-all duration-300 ${
                                  msg.isMine
                                    ? "bg-purple-600 text-white rounded-br-none"
                                    : "bg-white border text-gray-800 rounded-tl-none"
                                }`}
                              >
                                {msg.content}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                      </AnimatePresence>
                    </div>

                    {/* Input with File Upload */}
                    <div className="p-4 flex items-center gap-3 bg-white border-t shadow-inner">
                      <input
                        type="file"
                        id="chatFile"
                        className="hidden"
                        onChange={handleFileUpload}
                      />

                      {/* + File Upload */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() =>
                          document.getElementById("chatFile").click()
                        }
                        className="text-white bg-purple-600 hover:bg-purple-700 rounded-full p-3 shadow-md transition-all duration-200"
                      >
                        <Plus size={20} />
                      </motion.button>

                      <input
                        type="text"
                        className="flex-1 border-2 border-gray-200 rounded-full px-5 py-3 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      />

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={sendMessage}
                        disabled={!messageText.trim()}
                        className={`text-white rounded-full p-3 shadow-lg transition-all duration-200 ${
                          !messageText.trim()
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700"
                        }`}
                      >
                        <Send size={20} />
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 text-xl font-medium bg-gradient-to-tr from-purple-100 to-gray-100">
                    <MessageSquare size={64} className="mb-4 text-purple-400" />
                    <p>Welcome to Group Chat!</p>
                    <p className="text-base font-normal mt-1">
                      Select a group from the sidebar to begin chatting.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
              >
                <h2 className="text-2xl font-extrabold mb-5 text-center text-purple-700">
                  Create New Group
                </h2>

                <input
                  type="text"
                  placeholder="Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 mb-4 text-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition"
                />

                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Select Members:
                </h3>
                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-xl p-3 bg-gray-50">
                  {users.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">
                      No other users found
                    </p>
                  ) : (
                    users.map((u) => (
                      <label
                        key={u._id}
                        className="flex items-center gap-3 p-3 hover:bg-purple-100 rounded-lg cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(u._id)}
                          onChange={() => toggleUserSelect(u._id)}
                          className="form-checkbox h-5 w-5 text-purple-600 rounded-md focus:ring-purple-500 transition"
                        />
                        <div className="flex flex-col flex-1">
                          <span className="font-semibold text-gray-800">
                            {u.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {u.email}
                          </span>
                        </div>
                      </label>
                    ))
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createGroup}
                    disabled={!groupName.trim() || selectedUsers.length === 0}
                    className={`px-6 py-2 text-white rounded-xl transition font-medium shadow-md ${
                      !groupName.trim() || selectedUsers.length === 0
                        ? "bg-purple-300 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    Create Group
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default GroupChatPage;
