import React from "react";
import Hero from "./Hero/Hero";

import FeaturedWorkSpaceListSSR from "./FeaturedWorkSpaceList/FeaturedWorkSpaceListSSR";
import FeaturedFlatListSSR from "./FeaturedFlatList/FeaturedFlatListSSR";

const HomePage = () => {
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-10 md:gap-20">
        <FeaturedFlatListSSR />
        <FeaturedWorkSpaceListSSR />
      </div>
    </>
  );
};

export default HomePage;
