import React, { useState } from "react";
import {
  MessageSquare,
  Users,
  Bell,
  FileText,
  Mail,
FolderGit, 
  Users2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const SlideBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Chat", icon: <MessageSquare size={20} />, path: "/chat" },
    { name: "Group Chat", icon: <Users2 size={20} />, path: "/groupchat" },
    { name: "Users", icon: <Users size={20} />, path: "/users" },
    { name: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
    { name: "File Sharing", icon: <FileText size={20} />, path: "/files" },
    { name: "Mail", icon: <Mail size={20} />, path: "/mail" },
    {
      name: "GitHub",
        icon: <FolderGit size={20} />,
      path: "https://github.com",
      external: true,
    },
  ];

  return (
    <motion.div
      animate={{ width: isOpen ? 250 : 80 }}
      className=" h-140 rounded-2xl bg-gradient-to-b from-purple-600 to-indigo-600 text-white shadow-xl flex flex-col"
    >
      {/* Toggle Button */}
      <div
        className="flex justify-end p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-lg">{isOpen ? "<<" : ">>"}</span>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col mt-4">
        {menuItems.map((item, idx) => {
          const isActive = item.path === location.pathname;
          const itemClasses = `flex items-center gap-3 p-3 m-2 rounded-xl cursor-pointer hover:bg-white/20 transition-all ${
            isActive ? "bg-white/30 font-semibold" : ""
          }`;

          return item.external ? (
            <a
              key={idx}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className={itemClasses}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </a>
          ) : (
            <Link key={idx} to={item.path} className={itemClasses}>
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SlideBar;
