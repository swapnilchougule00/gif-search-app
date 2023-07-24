// src/ScrollToTopButton.js
import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-4 left-[50%]  font-thin hover:scale-105 bg-gray-950 text-white px-4 rounded-full py-2 "
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
