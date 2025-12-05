import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  MessageSquare,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import MainNavbar from "../NavBar/MainNavbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import SlideBar from "../NavBar/SlideBar";

// --- Animation Variants (Reused for consistency) ---

// Container animation for sequential item rollout
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

// Item animation for slide-up effect
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

// Component to represent a key feature
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="p-6 bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-purple-300/50 transition duration-300 flex flex-col"
    variants={itemVariants}
    transition={{ delay }}
    whileHover={{ scale: 1.03 }}
  >
    <Icon size={32} className="text-purple-600 mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative w-full md:px-10 px-5 py-5 md:py-8">
        <MainNavbar />
      </div>
      <motion.div
        className="min-h-screen bg-white p-4 md:p-12 font-inter text-gray-900 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- HERO SECTION --- */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.p
            className="text-lg text-purple-600 font-medium mb-4 uppercase tracking-wider"
            variants={itemVariants}
          >
            Our Story
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter"
            variants={itemVariants}
          >
            <span className="block">Building the Future of</span>
            <span className="text-purple-600">Connected Teams.</span>
          </motion.h1>
        </div>

        {/* --- MISSION SECTION --- */}
        <motion.div
          className="max-w-6xl mx-auto mb-20 p-8 bg-gray-50 rounded-3xl shadow-inner border border-gray-100"
          variants={itemVariants}
          transition={{ delay: 0.4 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-purple-800">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To eliminate the friction of distance, allowing distributed
                teams to operate with the fluidity, trust, and speed of a
                single-room office. We believe geography should never dictate
                collaboration quality.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-purple-800">
                Our Commitment
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                ZenithSync is committed to empowering every team member,
                regardless of location, with seamless access to resources, clear
                communication channels, and a shared sense of purpose.
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- CORE ADVANTAGE SECTION --- */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.h2
            className="text-4xl font-extrabold mb-10 text-center"
            variants={itemVariants}
          >
            The ZenithSync Advantage
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageSquare}
              title="Real-Time Sync"
              description="Instantaneous communication and resource sharing to keep your projects moving without lag."
              delay={0.6}
            />
            <FeatureCard
              icon={Globe}
              title="Global Harmony"
              description="Tools designed to bridge time zone differences and cultural divides, ensuring inclusive collaboration."
              delay={0.8}
            />
            <FeatureCard
              icon={Briefcase}
              title="Focused Productivity"
              description="Minimize context switching with integrated workflows that streamline tasks, documents, and meetings."
              delay={1.0}
            />
          </div>
        </div>

        {/* --- CTA / FOOTER SECTION --- */}
        <motion.div
          className="max-w-4xl mx-auto text-center pt-10 border-t border-gray-200"
          variants={itemVariants}
          transition={{ delay: 1.2 }}
        >
          <p className="text-xl mb-6 text-gray-600">
            Ready to harmonize your team's potential?
          </p>
          <motion.button
            className="flex items-center justify-center mx-auto bg-purple-600 text-white py-3 px-8 rounded-full text-lg font-bold shadow-xl shadow-purple-400/50 hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={()=>navigate('/subcription')}
          >
            Join the Movement
            <ArrowUpRight className="ml-2 w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>
      <Footer/>

      <SlideBar/>
    </>
  );
};

export default AboutPage;
