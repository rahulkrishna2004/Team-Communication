  import React, { useEffect, useState, useRef } from "react";
  import axiosInstance from "../Axios/axiosInstance";
  import { motion } from "framer-motion";
  import { useNavigate } from "react-router-dom";
  import MainNavbar from "../NavBar/MainNavbar";
  import SlideBar from "../NavBar/SlideBar";
  import { Plus } from "lucide-react";

  const ChatPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // ✅ Load logged-in user
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
      else navigate("/login");
    }, []);

    // ✅ Fetch users
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await axiosInstance.get("/user");
          setUsers(res.data.filter((u) => u._id !== currentUser?._id));
        } catch (err) {
          console.error("Error fetching users", err);
        }
      };
      if (currentUser) fetchUsers();
    }, [currentUser]);

    // ✅ Fetch messages
    useEffect(() => {
      const fetchMessages = async () => {
        if (!selectedUser) return;
        try {
          const res = await axiosInstance.get(`/message/${selectedUser._id}`);
          setMessages(res.data);
        } catch (err) {
          console.error("Error fetching messages", err);
        }
      };
      fetchMessages();
    }, [selectedUser]);

    // ✅ Send text message
    const handleSend = async (e) => {
      e.preventDefault();
      if (!newMsg.trim() || !selectedUser) return;

      try {
        const res = await axiosInstance.post("/message", {
          receiverId: selectedUser._id,
          content: newMsg,
        });
        setMessages((prev) => [...prev, res.data]);
        setNewMsg("");
      } catch (err) {
        console.error("Error sending message", err);
      }
    };

    // ✅ Delete message
    const handleDelete = async (id) => {
      try {
        await axiosInstance.delete(`/message/${id}`);
        setMessages(messages.filter((m) => m._id !== id));
      } catch (err) {
        console.error("Error deleting message", err);
      }
    };

    // ✅ File upload handler
    const handleSelectFile = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file || !selectedUser) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        setProgress(0);

        // Adjust endpoint if your backend uses another route
        const res = await axiosInstance.post("/files/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        });

        const fileUrl = res.data?.fileUrl || "";
        const fileName = file.name;

        // Send file as message link
          const messageContent = `[${fileName}](${fileUrl})`;
          const msgRes = await axiosInstance.post("/message", {
            receiverId: selectedUser._id,
            content: messageContent,
          });

          setMessages((prev) => [...prev, msgRes.data]);
        } catch (err) {
          console.error("File upload failed:", err);
          alert("File upload failed ❌");
        } finally {
          setUploading(false);
          setProgress(0);
          e.target.value = "";
        }
      };

    return (
      <div className="md:px-5 px-2">
        <div className="relative w-full md:px-10 px-5 py-5 md:py-8">
          <MainNavbar />
        </div>

        <div className="flex min-h-80 bg-gradient-to-br from-purple-50 to-indigo-100">
          <div className="w-[80px] md:w-[250px] h-145">
            <SlideBar />
          </div>

          {/* Chat Section */}
          <div className="flex-1 flex flex-col md:flex-row gap-5 p-4 md:p-6">
            {/* User List */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80 }}
              className="w-full md:w-1/4 bg-white/80 border border-gray-200 rounded-3xl shadow-xl p-5 backdrop-blur-md"
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center flex items-center justify-center gap-2">
                <span className="text-3xl">💬</span> Chats
              </h2>

              {users.length === 0 ? (
                <p className="text-gray-400 text-sm text-center">No users found</p>
              ) : (
                <div className="space-y-3 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                  {users.map((u) => (
                    <motion.div
                      key={u._id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedUser(u)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition shadow-sm ${
                        selectedUser?._id === u._id
                          ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <img
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.name}`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border"
                      />
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{u.name}</p>
                        <p
                          className={`text-xs ${
                            selectedUser?._id === u._id
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          {u.email}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Chat Box */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80 }}
              className="flex flex-col flex-1 bg-white/80 border border-gray-200 rounded-3xl shadow-xl p-5 backdrop-blur-md"
            >
              {!selectedUser ? (
                <div className="flex flex-1 flex-col items-center justify-center text-gray-500 text-lg font-medium">
                  <span className="text-5xl mb-2">💬</span>
                  Select a user to start chatting
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${selectedUser.name}`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-gray-700">
                          {selectedUser.name}
                        </h2>
                        <p className="text-xs text-gray-500">🟢 Active now</p>file
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-3 px-1 scrollbar-thin scrollbar-thumb-gray-300">
                    {messages.length === 0 ? (
                      <p className="text-center text-gray-400 text-sm">
                        No messages yet 👋
                      </p>
                    ) : (
                      messages.map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex items-end ${
                            msg.senderId === currentUser?._id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {msg.senderId !== currentUser?._id && (
                            <img
                              src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${selectedUser.name}`}
                              alt="avatar"
                              className="w-8 h-8 rounded-full border"
                            />
                          )}

                          <div
                            className={`relative max-w-xs px-4 py-2 rounded-2xl shadow-lg break-words ${
                              msg.senderId === currentUser?._id
                                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: (msg.content || "")
                                .replace(
                                  /\[(.*?)\]\((.*?)\)/g,
                                  '<a href="$2" target="_blank" class="underline text-blue-200">$1</a>'
                                ),
                            }}
                          />

                          {msg.senderId === currentUser?._id && (
                            <img
                              src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${currentUser.name}`}
                              alt="avatar"
                              className="w-8 h-8 rounded-full border ml-2"
                            />
                          )}
                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Upload Progress */}
                  {uploading && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Input Section */}
                  <form
                    onSubmit={handleSend}
                    className="flex items-center gap-3 border-t border-gray-300 pt-3"
                  >
                    <button
                      type="button"
                      onClick={handleSelectFile}
                      disabled={uploading}
                      className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition"
                    >
                      <Plus size={22} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <input
                      type="text"
                      value={newMsg}
                      onChange={(e) => setNewMsg(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold shadow-md hover:shadow-lg transition"
                    >
                      🚀 Send
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    );
  };

  export default ChatPage;
