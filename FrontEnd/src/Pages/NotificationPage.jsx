import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import NotificationItem from "../Components/NotificationItem";
import { Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import MainNavbar from "../NavBar/MainNavbar";
import SlideBar from "../NavBar/SlideBar";

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    setCurrentUser(user);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    fetchNotifications();
  }, [navigate]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/notifaction");
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axiosInstance.post(`/notifaction/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const handleAddNotification = async () => {
    if (!type || !content) {
      alert("Please enter both type and content.");
      return;
    }
    try {
      await axiosInstance.post("/notifaction", { type, content });
      setShowAdd(false);
      setType("");
      setContent("");
      fetchNotifications();
    } catch (err) {
      console.error("Error adding notification:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 md:px-5 px-2">
      {/* Navbar */}
      <div className="px-8 py-4">
        <MainNavbar />
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[260px]">
          <SlideBar />
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                <Bell className="text-purple-600" /> Notifications
              </h1>
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full transition"
              >
                <Plus size={18} /> Add
              </button>
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : notifications.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                {notifications.map((n) => (
                  <NotificationItem
                    key={n._id}
                    notification={n}
                    onMarkRead={handleMarkAsRead}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center text-gray-400 py-10"
              >
                No notifications found.
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Add Notification Modal */}
      {showAdd && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl"
          >
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Add Notification
            </h2>

            <input
              type="text"
              placeholder="Type (e.g. message, group)"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />

            <textarea
              placeholder="Notification content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            ></textarea>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNotification}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default NotificationPage;
