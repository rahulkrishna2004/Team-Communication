// src/pages/Features.jsx
import React from "react";
import {
  Users,
  MessageCircle,
  Bell,
  FileText,
  CheckCircle,
  GitBranch,
  Key,
  UserCheck,
} from "lucide-react";
import MainNavbar from "../NavBar/MainNavbar";
import Footer from "../Components/Footer";

const features = [
  {
    title: "Personal Chatting",
    description: "Send private messages to team members in real-time.",
    icon: <MessageCircle className="text-purple-600" size={28} />,
  },
  {
    title: "Group Chatting",
    description: "Create groups and communicate with multiple members at once.",
    icon: <Users className="text-purple-600" size={28} />,
  },
  {
    title: "Real-Time Notifications",
    description: "Receive instant alerts for messages, mentions, and updates.",
    icon: <Bell className="text-purple-600" size={28} />,
  },
  {
    title: "File Sharing",
    description: "Upload and share documents, images, and other resources.",
    icon: <FileText className="text-purple-600" size={28} />,
  },
  {
    title: "Status Verifying",
    description: "Check the online/offline status of team members at a glance.",
    icon: <CheckCircle className="text-purple-600" size={28} />,
  },
  {
    title: "Git Repository Sharing",
    description: "Share and collaborate on Git repositories seamlessly.",
    icon: <GitBranch className="text-purple-600" size={28} />,
  },
  {
    title: "User Authentication",
    description: "Secure login and access management for all team members.",
    icon: <Key className="text-purple-600" size={28} />,
  },
  {
    title: "Group Admin Management",
    description: "Assign roles, manage permissions, and control group access.",
    icon: <UserCheck className="text-purple-600" size={28} />,
  },
];


const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 ">
      <div className="relative w-full md:px-10 px-5 pt-5 md:pt-8 md:pb-2">
        <MainNavbar />
      </div>

      {/* Header Section */}
      <div className="relative w-full md:px-10 px-5 pt-5 md:pt-8 md:pb-2  overflow-hidden">
        <header
          className="text-center py-16 px-6 md:px-16 bg-cover bg-center bg-no-repeat relative rounded-4xl"
          style={{ backgroundImage: "url('/banner1.jpeg')" }}
        >
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Boost Your Productivity
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Empower your team with a powerful all-in-one work management
              platform.
            </p>
          </div>

          {/* Optional overlay */}
          <div className="absolute inset-0 bg-black/70 rounded-4xl  "></div>
        </header>
      </div>

      {/* Key Features Section */}
      <section className="py-10 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2 mb-4">{feature.description}</p>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="text-purple-600" size={18} />
                  <span>Fast & Easy to Use</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="text-purple-600" size={18} />
                  <span>Trusted by Teams</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Features;
