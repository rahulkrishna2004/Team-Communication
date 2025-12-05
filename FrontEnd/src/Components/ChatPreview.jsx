import React from "react";
import { motion } from "framer-motion";

// ChatBubble Component (can be reused in ChatPreview)
const ChatBubble = ({ message, isSender, delay }) => (
  <motion.div
    className={`flex ${isSender ? "justify-end" : "justify-start"} w-full mb-3`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", stiffness: 70, damping: 10, delay: delay }}
  >
    <div
      className={`p-3 max-w-[80%] md:max-w-[75%] rounded-2xl shadow-md ${
        isSender
          ? "bg-purple-600 text-white rounded-br-sm"
          : "bg-gray-100 text-gray-800 rounded-tl-sm"
      }`}
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  </motion.div>
);

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

const ChatPreview = () => (
  <motion.div
    className="w-full lg:w-96 h-130 bg-white/50 border border-gray-100 rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-purple-200/50"
    variants={itemVariants}
    style={{ transform: "rotate(0deg)" }}
    whileHover={{ rotate: 1, y: -5 }}
  >
    {/* Chat Header */}
    <div className="flex items-center p-2 border-b bg-white">
      <img
        src="./removeLogo.png"
        alt="Team Logo"
        className="w-6 h-6 rounded-full mr-2 object-cover bg-purple-200"
      />
      <span className="font-semibold text-sm">
        Dev{" "}
        <span className="bg-purple-700 text-white px-2 rounded-2xl">
          Desk
        </span>{" "}
        - Remote Channel
      </span>
    </div>

    {/* Chat History */}
    <div className="flex-1 overflow-y-scroll p-4 space-y-2">
      <ChatBubble
        message="Hey team! Just sent the updated project brief to the shared drive."
        isSender={false}
        delay={0.6}
      />
      <ChatBubble
        message="Got it! Looks much clearer. The new budget breakdown is helpful."
        isSender={true}
        delay={0.8}
      />
      <ChatBubble
        message="Thanks! Let me know if you need any other resource links."
        isSender={false}
        delay={1.0}
      />
      <ChatBubble
        message="Will do. Ready for the next sprint now!"
        isSender={true}
        delay={1.2}
      />
      <ChatBubble message="Excellent. ✅" isSender={false} delay={1.4} />
    </div>

    {/* Input Placeholder */}
    <div className="p-3 border-t bg-gray-50">
      <input
        type="text"
        placeholder="Send a message..."
        className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        disabled
      />
    </div>
  </motion.div>
);

export default ChatPreview;
