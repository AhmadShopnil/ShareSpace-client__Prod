"use client";

import PriceRange from "./PriceRange";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

const FilterFlat = ({
  setQueries,
}: {
  setQueries: Dispatch<SetStateAction<{}>>;
}) => {
  const [beds, setBeds] = useState("Any");
  const [baths, setBaths] = useState("Any");
  const [category, setCategory] = useState("Any");
  const [gender, setGender] = useState("Any"); // New state for gender
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isLineGas, setIsLineGas] = useState<"Any" | "Yes" | "No">("Any");
  const categories = ["Any", "Family", "Sublet"];

  // For PriceRange Component
  const [minRent, setMinRent] = useState(0);
  const [maxRent, setMaxRent] = useState(100000);

  const handlePriceChange = (min: number, max: number) => {
    setMinRent(min);
    setMaxRent(max);
  };

  // Debounce the search term only
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // 500ms debounce delay for searchTerm only

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Update the queries immediately when any filter (except searchTerm) changes
  useEffect(() => {
    const query: { [key: string]: any } = {};

    if (beds !== "Any") query.totalBedrooms = beds;
    if (baths !== "Any") query.totalBathrooms = baths;
    if (category !== "Any") query.homeSpaceType = category;
    if (gender !== "Any" && category === "Sublet") query.subletGender = gender; // Only add subletGender if category is "Sublet"
    if (debouncedSearchTerm) query.searchTerm = debouncedSearchTerm;
    if (isLineGas !== "Any") query.isLineGas = isLineGas;
    query.minRent = minRent;
    query.maxRent = maxRent;

    setQueries(query);
  }, [
    beds,
    baths,
    category,
    gender,
    debouncedSearchTerm,
    isLineGas,
    minRent,
    maxRent,
    setQueries,
  ]);

  return (
    <div>
      <PriceRange min={0} max={100000} onChange={handlePriceChange} />

      <div className="my-4 md:my-6">
        <div className="gap-3 grid sm:grid-cols-2 lg:grid-cols-3 justify-between">
          {/* Beds */}
          <div className="">
            <h3 className="text-md md:text-lg mb-1">Beds</h3>
            <div className="flex text-xs md:text-sm space-x-2">
              {["Any", "1", "2", "3", "4", "5", "6", "7", "8"].map((item) => (
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
          <div className="">
            <h3 className="text-md md:text-lg mb-1">Bathrooms</h3>
            <div className="flex text-xs md:text-sm space-x-2">
              {["Any", "1", "2", "3", "4", "5", "6", "7", "8"].map((item) => (
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
          <div className="">
            <h2 className="text-md md:text-lg mb-1">Type</h2>
            <div className="flex text-xs md:text-sm space-x-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    if (cat !== "Sublet") {
                      setGender("Any"); // Reset gender when category changes to something other than "Sublet"
                    }
                  }}
                  className={`p-2 rounded ${
                    category === cat ? "bg-teal-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {category === "Sublet" && (
            <div className="">
              <h3 className="text-md md:text-lg mb-1">
                Gender For Sublet or Bachelor
              </h3>
              <div className="flex text-xs md:text-sm space-x-2">
                {["Any", "Female", "Male"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setGender(option)}
                    className={`p-2 rounded ${
                      gender === option
                        ? "bg-teal-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Gas Line */}
          <div className="">
            <h2 className="text-md md:text-lg mb-1">Gas Line</h2>
            <div className="flex text-xs md:text-sm space-x-2">
              {["Any", "Yes", "No"].map((option) => (
                <button
                  key={option}
                  onClick={() => setIsLineGas(option as "Any" | "Yes" | "No")}
                  className={`p-2 rounded ${
                    isLineGas === option
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-md md:text-lg mb-1 md:mb-2 ">
          Search by Location, Description and Title
        </h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder=" Search by Location, Description and Title"
          className="text-xs md:text-lg w-full p-2 border rounded focus:outline-none focus:ring focus:ring-teal-500"
        />
      </div>
    </div>
  );
};

export default FilterFlat;
