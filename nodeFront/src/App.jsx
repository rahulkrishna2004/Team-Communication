import React from "react";
import "./index.css";

import Navbar from "./Components/NavBar/Navbar";
import Footer from "./Components/Footer/Footer";
import Banner from "./Components/Hero/Banner";

const App = () => {
  return (
    <>
      <div className="px-20 py-15  bg-zinc-100">
        <Navbar />
        <Banner />
      </div>
      <Footer />
    </>
  );
};

export default App;
