import React from "react";
import Hero from "./Hero/Hero";
import FlatList from "./FeaturedFlatList/FlatList";
import FlatListSSR from "./FeaturedFlatList/FlatListSSR";

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* <FlatList /> */}
      <FlatListSSR></FlatListSSR>
    </>
  );
};

export default HomePage;
