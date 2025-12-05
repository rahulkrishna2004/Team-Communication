import React from "react";
import "./LoadingPage.css"; // add custom CSS

const LoadingPage = () => {
  return (
    <div className="flex items-top justify-center h-screen w-full ">
      <h1 className="text-2xl font-bold text-black flex space-x-1">
        {"Loading...".split("").map((letter, index) => (
          <span
            key={index}
            className="bounce-letter"
            style={{ animationDelay: `${index * 0.15}s`}}
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default LoadingPage;
