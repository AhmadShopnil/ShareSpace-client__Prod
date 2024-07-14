import React from "react";
import Hero from "./Hero/Hero";

import FlatListServer from "./FlatList/FlatList2";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FlatListServer></FlatListServer>
      {/* <FlatList /> */}
    </>
  );
};

export default HomePage;
