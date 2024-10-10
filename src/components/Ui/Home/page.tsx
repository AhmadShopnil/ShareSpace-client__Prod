import React from "react";
import Hero from "./Hero/Hero";
import FlatList from "./FlatList/FlatList";
import FlatListSSR from "./FlatList/FlatListSSR";

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
