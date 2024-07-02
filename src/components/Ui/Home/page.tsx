import FlatCard from "@/components/Shared/FlatCard/FlatCard";
import React from "react";
import Hero from "./Hero/Hero";

const HomePage = () => {
  return (
    <div>
      <Hero></Hero>
      <div className="flex flex-wrap justify-center">
        <FlatCard
          title="School Bag"
          date="01/07/2024"
          location="Dhanmondi, Dhaka"
        />
        <FlatCard
          title="School Bag"
          date="01/07/2024"
          location="Dhanmondi, Dhaka"
        />
        <FlatCard
          title="School Bag"
          date="01/07/2024"
          location="Dhanmondi, Dhaka"
        />
        <FlatCard
          title="School Bag"
          date="01/07/2024"
          location="Dhanmondi, Dhaka"
        />
      </div>
    </div>
  );
};

export default HomePage;
