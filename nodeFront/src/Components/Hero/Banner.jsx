import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div>
      <main className="flex p-20">
        {/* Left Section */}
        <motion.div
          className="left w-[50%] flex flex-col justify-center items-start px-16"
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-end ">
              <img src="./logo.png" className="h-25 w-25 rotate-10" alt="" />
             <h1> Welcome to  <span className="text-blue-500">Appli Track </span> </h1>
            </div>{" "}
          </motion.h1>

          <motion.p
            className="text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-2xl font-semibold py-5 text-green-500">Electric Appliance Management System</h1>
            Manage all your electrical appliances efficiently with our smart
            system. Save time, save energy, and stay connected.
          </motion.p>

          <motion.button
            className="bg-white text-blue-500 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
            whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="right px-20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="./bannerRB.png"
            alt="Banner"
            className="max-w-full h-auto"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Banner;
