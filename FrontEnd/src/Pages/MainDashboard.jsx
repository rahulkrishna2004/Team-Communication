import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Crown ,MessageSquareMore, Users,BellRing, CircleEllipsis, UserStar } from "lucide-react";

import ChatPreview from "../Components/ChatPreview"; // ChatPreview separated
import { useNavigate } from "react-router-dom";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const MainDashboard = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="min-h-screen bg-white p-4 md:p-12 font-inter text-gray-900 overflow-hidden flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Section: Hero Image and Avatars */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative">
        {/* Left: Hero Image Card */}
        <motion.div
          className="relative flex-1 max-w-lg lg:max-w-xl aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl transition-shadow"
          variants={itemVariants}
          whileHover={{
            scale: 1.01,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Hero Image */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('./Team.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>

          {/* Explore Button */}
          <motion.button
            className="absolute top-4 right-4 bg-white text-gray-800 font-bold py-2 px-4 rounded-full text-sm shadow-lg hover:bg-gray-100/90 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/feactures")}
          >
            Explore Our Service
          </motion.button>
        </motion.div>

        {/* Right: Avatars & Consultation */}
        <div className="flex flex-col items-center lg:items-start space-y-4 pt-4 lg:pt-0">
          {/* Avatars */}
          <motion.div
            className="flex items-center space-x-4 ml-auto lg:ml-0"
            variants={itemVariants}
          >
            <p className="text-sm text-gray-600 hidden sm:block">
              Collaborate in real-time and share resources
            </p>
            <div className="flex -space-x-3">
              {[
                "https://randomuser.me/api/portraits/women/1.jpg",
                "https://randomuser.me/api/portraits/men/2.jpg",
                "https://randomuser.me/api/portraits/women/3.jpg",
                "https://randomuser.me/api/portraits/men/4.jpg",
              ].map((img, index) => (
                <motion.div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: index * 0.1 },
                  }}
                  whileHover={{ zIndex: 10, scale: 1.2 }}
                >
                  <img
                    src={img}
                    alt={`Team member ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Get Free Subscription */}
          <div className="flex gap-5 flex-col">
            <div className="flex gap-5">
              <motion.div
                className="w-24 h-24 bg-purple-100 rounded-xl flex flex-col items-center justify-center p-2 text-purple-700 shadow-xl cursor-pointer ml-auto lg:ml-0 mt-8"
                variants={itemVariants}
                whileHover={{ rotate: 5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/chat")}
              >
                <MessageSquareMore size={30} strokeWidth={1.5} />
                <span className="text-xs mt-1 text-center font-semibold">
                  Chat 
                </span>
              </motion.div>{" "}
              <motion.div
                className="w-24 h-24 bg-purple-100 rounded-xl flex flex-col items-center justify-center p-2 text-purple-700 shadow-xl cursor-pointer ml-auto lg:ml-0 mt-8"
                variants={itemVariants}
                whileHover={{ rotate: 5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/groupchat")}
              >
                <Users size={30} strokeWidth={1.5} />
                <span className="text-xs mt-1 text-center font-semibold">
                 Group chat
                </span>
              </motion.div>
            </div>
            <div className="flex gap-5">
              <motion.div
                className="w-24 h-24 bg-purple-100 rounded-xl flex flex-col items-center justify-center p-2 text-purple-700 shadow-xl cursor-pointer ml-auto lg:ml-0 mt-8"
                variants={itemVariants}
                whileHover={{ rotate: 5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/notifications")}
              >
                <BellRing size={30} strokeWidth={1.5} />
                <span className="text-xs mt-1 text-center font-semibold">
                 Notification
                </span>
              </motion.div>{" "}
              <motion.div
                className="w-24 h-24 bg-purple-100 rounded-xl flex flex-col items-center justify-center p-2 text-purple-700 shadow-xl cursor-pointer ml-auto lg:ml-0 mt-8"
                variants={itemVariants}
                whileHover={{ rotate: 5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/users")}
              >
                <UserStar  size={30} strokeWidth={1.5} />
                <span className="text-xs mt-1 text-center font-semibold">
                 Users
                </span>
              </motion.div>
            </div>
            <div className="flex gap-5">
              
              <motion.div
                className="w-24 h-24 bg-purple-100 rounded-xl flex flex-col items-center justify-center p-2 text-purple-700 shadow-xl cursor-pointer ml-auto lg:ml-0 mt-8"
                variants={itemVariants}
                whileHover={{ rotate: 5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/subcription")}
              >
                <Crown size={30} strokeWidth={1.5} />
                <span className="text-xs mt-1 text-center font-semibold">
                  Get Subscription
                </span>
              </motion.div>
              <motion.div
                className="w-24 h-24 bg-purple-100 rounded-xl flex flex-col items-center justify-center p-2 text-purple-700 shadow-xl cursor-pointer ml-auto lg:ml-0 mt-8"
                variants={itemVariants}
                whileHover={{ rotate: 5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/slideBar")}
              >
                <CircleEllipsis  size={30} strokeWidth={1.5} />
                <span className="text-xs mt-1 text-center font-semibold">
                  More Options
                </span>
              </motion.div>{" "}
            </div>
          </div>
        </div>
      </div>

      {/* ChatPreview */}
      <div className="absolute right-30 top-120 transform -translate-y-1/2 hidden lg:block">
        <ChatPreview />
      </div>

      {/* Main Content: Headings */}
      <div className="mt-16 relative z-10">
        <motion.p
          className="text-lg text-gray-500 font-medium mb-2"
          variants={itemVariants}
        >
          Harmonize Your Team's Potential
        </motion.p>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-none tracking-tighter uppercase mt-4"
          variants={containerVariants}
        >
          <span className="block">
            <motion.span variants={itemVariants}>Dev-Desk</motion.span>
          </span>
          <span className="flex flex-wrap items-center mt-2">
            <motion.span variants={itemVariants} className="block mr-4">
              Empowering
            </motion.span>

            <motion.span variants={itemVariants} className="block">
              Smarter Collaboration
            </motion.span>
          </span>
        </motion.h1>
      </div>

      {/* Footer */}
      <div className="mt-auto"></div>
    </motion.div>
  );
};

export default MainDashboard;
