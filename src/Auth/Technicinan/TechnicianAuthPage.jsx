import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TechnicianAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 overflow-hidden">
        <div className="text-center mb-6">
          <div className=" ">
            <img
              src="./logo.png"
              className="h-15 w-15 rotate-10 absolute"
              alt=""
            />
            <h1 className="text-2xl font-semibold py-2">
              {" "}
              Welcome to <span className="text-blue-500">
                Appli Track{" "}
              </span>{" "}
            </h1>
          </div>
          <u>
            {" "}
            <h1 className="text-3xl font-bold text-gray-800 ">
              {isLogin ? "Techician Login" : "Register"}
            </h1>
          </u>
          <p className="text-gray-500 mt-2">
            {isLogin
              ? "Welcome back! Please login to your account."
              : "Create a new account to get started."}
          </p>
        </div>

        {/* AnimatePresence handles enter/exit animations */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form
              key="login"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full hover:text-white hover:bg-[#3E5AF0]  font-semibold bg-zinc-300 py-2 rounded-lg transition"
              >
                Login
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full hover:text-white hover:bg-[#3E5AF0]  font-semibold bg-zinc-300 rounded-lg py-3 transition"
              >
                Register
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Switch link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 font-medium hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default TechnicianAuthPage;
