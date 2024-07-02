import FlatCard, { TFlat } from "@/components/Shared/FlatCard/FlatCard";
import React from "react";

const FlatList = () => {
  const flats: TFlat[] = [
    {
      title: "5 Bedroom Apartment",
      totalBedrooms: 5,
      location: "Downtown City",
      description: "A spacious 5 bedroom apartment with modern amenities.",
      rent: 5500,
      advanceAmount: 500,
    },
    {
      title: "3 Bedroom Condo",
      totalBedrooms: 3,
      location: "Suburban Area",
      description: "A cozy 3 bedroom condo with scenic views.",
      rent: 3800,
      advanceAmount: 400,
    },
    {
      title: "Studio Apartment",
      totalBedrooms: 1,
      location: "City Center",
      description: "A stylish studio apartment perfect for singles or couples.",
      rent: 2500,
      advanceAmount: 300,
    },
    {
      title: "Studio Apartment",
      totalBedrooms: 1,
      location: "City Center",
      description: "A stylish studio apartment perfect for singles or couples.",
      rent: 2500,
      advanceAmount: 300,
    },
  ];

  console.log(flats);

  return (
    <div className="grid grid-cols-4 gap-4 justify-around">
      {flats.map((flat, index) => (
        <FlatCard key={index} flat={flat} />
      ))}
    </div>
  );
};

export default FlatList;
