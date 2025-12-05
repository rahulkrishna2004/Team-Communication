import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import UserRegister from "../Auth/UserRegister";
import UserLogin from "../Auth/UserLogin";
import Features from "../Pages/Features";
import HeroSection from "../Pages/HeroSection";
import ChatPage from "../Pages/ChatPage";
import GroupChatPage from "../Pages/GroupChatPage";
import Users from "../Pages/Users";
import NotificationPage from "../Pages/NotificationPage";
import FileManager from "../Pages/FileManager";
import AboutPage from "../Pages/AboutPage";
import Subcription from "../Pages/PricingPage";
import ScrollToTop from "../Components/ScrollToTop";
import SlideBar from "../NavBar/SlideBar";

const MainRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/groupchat" element={<GroupChatPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/files" element={<FileManager />} />
        {/* ------ */}

        <Route path="/slideBar" element={<SlideBar/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feactures" element={<Features />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/subcription" element={<Subcription />} />
      </Routes>
    </>
  );
};

export default MainRouter;
