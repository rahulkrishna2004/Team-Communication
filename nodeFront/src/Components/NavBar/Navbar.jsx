import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md rounded-2xl px-8 py-4 flex justify-between items-center">
      {/* Logo / App Name */}
      <div className="flex items-center gap-3">
        <img
          src="./logo.png"
          alt="AppliTrack Logo"
          className="w-10 h-10 object-contain"
        />
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide">
          Appli<span className="text-[#3E5AF0]">Track</span>
        </h1>
      </div>

      {/* Right Side - Auth Buttons */}
      <div className="flex items-center gap-4">
        <button className="px-5 py-2 rounded-xl font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition duration-300">
          Login
        </button>
        <button className="px-5 py-2 rounded-xl font-semibold text-white bg-[#3E5AF0] hover:bg-[#3246c9] shadow-md transition duration-300">
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
