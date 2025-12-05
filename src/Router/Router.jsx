import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

const Router = () => {
  return (
    <Routes>
      <Route path="/footer" element={<Footer />} />
    </Routes>
  );
};

export default Router;
