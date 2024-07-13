import React from "react";
import Hero from "./Hero/Hero";
import FlatList from "./FlatList/FlatList";
import FeaturedFlatList from "./FlatList/FeaturedFlatList";

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* <FeaturedFlatList></FeaturedFlatList> */}
      <FlatList />
    </>
  );
};

export default HomePage;
