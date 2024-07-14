"use client";

import FilterFlat from "@/components/Shared/FilterFlat/FilterFlat";
import AllFlatList from "@/components/Ui/AllFlatLIst/AllFlatList";

import { useState } from "react";

const AllFlatListPage = () => {
  const [queries, setQueries] = useState({});

  const queryString = new URLSearchParams(queries).toString();

  // console.log("queryString: ", queryString);
  // console.log("query: ", queries);

  // const res = await fetch("https://server-flate-share.vercel.app/api/flats");

  // const { data: flats }: { data: TFlat[] } = await res.json();

  return (
    <div className="">
      <FilterFlat setQueries={setQueries}></FilterFlat>
      <AllFlatList queryString={queryString}></AllFlatList>
    </div>
  );
};

export default AllFlatListPage;
