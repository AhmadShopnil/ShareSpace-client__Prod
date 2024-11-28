"use client";

import PriceRange from "./PriceRange";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

const FilterWorkSpace = ({
  setQueries,
}: {
  setQueries: Dispatch<SetStateAction<{}>>;
}) => {
  const [category, setCategory] = useState("Any");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const categories = ["Any", "Flat", "Tiner-ghor", "Tin-Shade"];

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

    if (category !== "Any") query.category = category;
    if (debouncedSearchTerm) query.searchTerm = debouncedSearchTerm;
    query.minRent = minRent;
    query.maxRent = maxRent;

    setQueries(query);
  }, [category, debouncedSearchTerm, minRent, maxRent, setQueries]);

  return (
    <div className="p-4">
      <PriceRange min={0} max={40000} onChange={handlePriceChange} />

      <div className="my-8">
        <div className="mb-2 gap-3 grid sm:grid-cols-2 lg:grid-cols-3 justify-between">
          {/* Categories */}
          <div className="mb-3">
            <h2 className="text-lg mb-1">Type</h2>
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
        <h2 className="text-lg mb-4">Search by Category, Location</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by location, category"
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-teal-500"
        />
      </div>
    </div>
  );
};

export default FilterWorkSpace;
