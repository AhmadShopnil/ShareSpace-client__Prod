"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FlatCard, { TFlat } from "@/components/Shared/FlatCard/FlatCard";

const FeaturedFlatList = () => {
  const [flats, setFlats] = useState<TFlat[]>([]);

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const response = await axios.get(
          "https://server-flate-share.vercel.app/api/flats"
        ); // Replace with your actual API endpoint
        setFlats(response.data.data); // Assuming response.data directly returns the array of flats
      } catch (error) {
        console.error("Error fetching flats:", error);
      }
    };

    fetchFlats();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
      {flats?.map((flat, index) => (
        <FlatCard key={index} flat={flat} />
      ))}
    </div>
  );
};

export default FeaturedFlatList;
