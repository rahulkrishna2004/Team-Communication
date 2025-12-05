// src/components/MainNavbar.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserCircle, Menu, X } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "framer-motion";

const MainNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [setUser]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-between bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-lg shadow-xl border border-white/10 px-5 py-4 rounded-2xl transition-all duration-500"
    >
      {/* Left Section - Logo */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="flex items-center space-x-3 cursor-pointer group"
        onClick={() => navigate("/")}
      >
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          src="/logo.jpeg"
          alt="Logo"
          className="w-14 h-14 rounded-full border-2 border-purple-500 shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-white"
        >
          <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            DevDesk
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            Team Communication & Task Board
          </p>
        </motion.div>
      </motion.div>

      {/* Center - Nav Links */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="hidden md:flex items-center gap-8 font-medium text-white"
      >
        {[
          { to: "/dashboard", label: "Dashboard" },
          { to: "/feactures", label: "Features" },
          { to: "/about", label: "About" },
          { to: "/subcription", label: "Subscription" },
        ].map((link, index) => (
          <motion.div
            key={link.to}
            whileHover={{
              scale: 1.07,
              color: "#a78bfa",
              textShadow: "0px 0px 8px rgba(167,139,250,0.7)",
            }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to={link.to}
              className={`relative px-4 py-2 transition-all duration-300 rounded-lg ${
                isActive(link.to)
                  ? "text-purple-400 after:w-full"
                  : "hover:text-purple-300"
              } after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full`}
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="md:hidden text-white hover:text-purple-400 transition-all"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </motion.button>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className={`flex-col md:flex-row md:flex items-center space-y-4 md:space-y-0 md:space-x-5 absolute md:static top-16 left-0 w-full md:w-auto bg-black/70 md:bg-transparent backdrop-blur-lg md:backdrop-blur-0 border-t border-white/10 md:border-none p-5 md:p-0 rounded-2xl md:rounded-none transition-all duration-300 ${
          menuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {!user ? (
          <>
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(168,85,247,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="px-6 py-2 rounded-full font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-md transition duration-300"
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              Login
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(99,102,241,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 shadow-lg transition duration-300"
              onClick={() => {
                navigate("/register");
                setMenuOpen(false);
              }}
            >
              Register
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center space-x-4"
          >
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(167,139,250,0.4)",
                }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/40 to-indigo-600/40 flex items-center justify-center border border-white/20 shadow-md"
              >
                <UserCircle className="text-white" size={32} />
              </motion.div>
              <span className="font-medium text-white capitalize tracking-wide">
                {user?.name || "User"}
              </span>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(239,68,68,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={handleLogout}
              className="px-5 py-2 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 shadow-md transition duration-300"
            >
              Logout
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  );
};

export default MainNavbar;
