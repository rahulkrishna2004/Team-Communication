import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
        
         {/* Team Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Team Members</h2>
          <p className="text-sm text-gray-300 leading-6">
            Rahul<br />
            Vishal Gowda <br />
            Darshan <br />
            Vijay <br />
          </p>
        </div>
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="text-sm text-gray-300 leading-6">
            This  Electric Appliance Management System 
            <strong>JSS Polytechnic College, Nanjangud, Mysore</strong>, Dept of{" "}
            <strong>Diploma in Computer Science</strong>.
            <br />
            Passionate about building user-friendly digital solutions with teamwork and creativity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">Shop</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
          </ul>
        </div>

       
      </div>

      {/* Social Links */}
      <div className="mt-8 flex justify-center gap-6 text-xl text-gray-300">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <FaLinkedin />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
          <FaTwitter />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <FaFacebook />
        </a>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400 px-4">
        &copy; {new Date().getFullYear()} Copy Rights | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
