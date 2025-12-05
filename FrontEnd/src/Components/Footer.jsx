import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-white text-2xl font-bold">Dev DEsk</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Empowering teams to collaborate, communicate, and reach their peak productivity — all in one place.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-purple-400 transition">Dashboard</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Chat</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Tasks</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Integrations</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-purple-400 transition">Documentation</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">API Reference</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Community</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Support</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4">
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-white">
              <Github size={20} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-white">
              <Linkedin size={20} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-white">
              <Twitter size={20} />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ZENITHSYNC. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
