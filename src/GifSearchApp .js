// src/GifSearchApp.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollToTopButton from "./ScrollToTopButton ";
import Gifs from "./Gifs";

const GifSearchApp = () => {
  const [searchQuery, setSearchQuery] = useState("ronaldo");
  const [gifs, setGifs] = useState([]);
  const [limit, setLimit] = useState(16)
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const apiKey = "sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh";
  const apiUrl = "https://api.giphy.com/v1/gifs/search";



  const fetchGifs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
          q: searchQuery,
          offset: offset,
          limit: limit,
        },
      });

      if (offset === 0) {
        setGifs(response.data.data);
      } else {
        setGifs((prevGifs) => [...prevGifs, ...response.data.data]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching gifs:", error);
    }
  };

  useEffect(() => {

    fetchGifs();
    // eslint-disable-next-line
  }, [limit]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setOffset(0);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!isLoading) {
        setLimit(limit + 4);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, [isLoading]);

  const handleSearch = () => {
    setLimit(16)
    fetchGifs();

  }



  return (
    <div className=" pb-4 text-white w-full ">
      <div className="px-10 py-6  bg-[#181818]">

        <h1 className="text-4xl tracking-widest text-center font-semibold mb-4">GIPHY</h1>
        <div className="mb-4 flex justify-center gap-6">
          <input
            type="text"
            className="border outline-none text-black rounded-xl w-[60%] px-4 py-2 "
            placeholder="Search GIFs"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <button onClick={handleSearch} className="py-2 px-4 tracking-wide  outline-1 transition-all duration-200 -outline-offset-4 outline hover:outline-offset-4 outline-white/50 rounded-lg bg-green-700">Search</button>
        </div>
      </div>
      <div className=" mx-16 mt-8 p-6 rounded-lg  gap-4  bg-[#181818]  ">
        <Gifs data={gifs} />

        {isLoading && (
          <div className="flex justify-center  w-full h-screen mt-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        )}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default GifSearchApp;
