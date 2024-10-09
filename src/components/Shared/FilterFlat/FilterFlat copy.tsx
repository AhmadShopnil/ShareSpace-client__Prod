"use client";

import PriceRange from "./PriceRange";
import React, { useState, Dispatch, SetStateAction } from "react";

const FilterFlat = ({
  setQueries,
}: {
  setQueries: Dispatch<SetStateAction<{}>>;
}) => {
  const [beds, setBeds] = useState("Any");
  const [baths, setBaths] = useState("Any");
  const [category, setCategory] = useState("Any");
  // const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = ["Any", "Flat", "Tiner-ghor", "Tin-Shade"];
  // for PriceRange Component
  const [minRent, setMinRent] = useState(0);
  const [maxRent, setMaxRent] = useState(100000);

  const handlePriceChange = (min: number, max: number) => {
    setMinRent(min);
    setMaxRent(max);
  };
  // End for PriceRange Component

  const handleShowResults = () => {
    const query: { [key: string]: any } = {};

    if (beds !== "Any") query.totalBedrooms = beds;
    if (baths !== "Any") query.totalBathrooms = baths;
    if (category !== "Any") query.category = category;
    if (searchTerm) query.searchTerm = searchTerm;
    query.minRent = minRent;
    query.maxRent = maxRent;

    // console.log("query: ", query);
    setQueries(query);
  };

  return (
    <div className="p-4">
      <PriceRange min={0} max={100000} onChange={handlePriceChange} />

      <div className="my-8 md:my-12">
        <div className="mb-2 gap-3 grid  sm:grid-cols-2 lg:grid-cols-3  justify-between">
          {/* Beds */}
          <div className="mb-3">
            <h3 className="text-lg mb-1">Beds</h3>
            <div className="flex  text-xs md:text-sm space-x-2">
              {["Any", "1", "2", "3", "4", "5", "6", "7", "8+"].map((item) => (
                <button
                  key={item}
                  onClick={() => setBeds(item)}
                  className={`p-2 rounded ${
                    beds === item ? "bg-teal-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Bathrooms */}
          <div className="mb-3">
            <h3 className="text-lg mb-1">Bathrooms</h3>
            <div className="flex  text-xs md:text-sm space-x-2">
              {["Any", "1", "2", "3", "4", "5", "6", "7", "8+"].map((item) => (
                <button
                  key={item}
                  onClick={() => setBaths(item)}
                  className={`p-2 rounded ${
                    baths === item ? "bg-teal-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Categories */}
          <div className="mb-3">
            <h2 className="text-lg mb-1">Categories</h2>
            <div className="flex text-xs md:text-sm space-x-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`p-2 rounded ${
                    category === cat ? "bg-teal-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg  mb-4">Search by Category, Location</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter location"
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-teal-500 "
        />
      </div>

      <button
        onClick={handleShowResults}
        className="bg-teal-600 text-sm text-white py-2 px-3 rounded hover:bg-teal-700"
      >
        Show Results
      </button>
    </div>
  );
};

export default FilterFlat;
