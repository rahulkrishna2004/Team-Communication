// src/components/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import MainNavbar from "../NavBar/MainNavbar";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  // animation variants for smoother entrance
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay },
    }),
  };

  return (
    <>
      <div className="relative w-full md:px-10 px-5 py-5 md:py-8">
        <MainNavbar />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 md:py-8 bg-white overflow-hidden">
        {/* Left Section */}
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col space-y-6 md:w-1/2"
        >
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.2}
            className="text-purple-500 font-semibold"
          ></motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.4}
            className="text-3xl md:text-4xl font-bold leading-tight text-gray-900"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Boost Productivity <br />
            Through{" "}
            <span className="text-black underline font-extrabold text-5xl decoration-purple-500">
              Effortless
            </span>{" "}
            Team Management
          </motion.h1>

          <h1 className="tex-2xl py-[-5px]">
            Make work forward with DEV DESK{" "}
          </h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.6}
            className="flex space-x-4 mt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/register")}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Get Started Today
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition"
            >
              See Our Features
            </motion.button>
          </motion.div>

          {/* Rating Boxes */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.8}
            className="flex flex-col md:flex-row gap-4 mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gray-900 text-white p-6 rounded-2xl w-full md:w-1/2 shadow-lg"
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl font-bold"
              >
                ⭐ 4.7
              </motion.p>
              <p className="text-sm mt-2 text-gray-300">
                "DevDesk boosted our team’s productivity by 100% and transformed
                the way we collaborate making it smooth, fast, and effortless.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.08, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hidden md:block text-white p-6 rounded-2xl w-15 md:w-80 h-80 shadow-lg absolute top-100 left-120 bg-gradient-to-r from-white/10  to-black/20"
            >
              <img src="./Hero.jpeg" className="h-full w-full" alt="" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-10 md:mt-0 md:w-1/2 flex justify-center"
        >
          <motion.img
            src="./meeting3.jpeg"
            alt="Team working"
            className="rounded-2xl shadow-xl w-full max-w-md h-120 sm:object-center "
            whileHover={{ scale: 1.08, rotate: 1 }}
            transition={{ type: "spring", stiffness: 250 }}
          />
        </motion.div>
        
      </div>
    </>
  );
};

export default HeroSection;
