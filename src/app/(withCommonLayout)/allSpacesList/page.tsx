"use client";
import FilterFlat from "@/components/Shared/Filter/FilterFlat";
import FilterMainCategory from "@/components/Shared/Filter/FilterMainCategory";
import FilterWorkSpace from "@/components/Shared/Filter/FilterWorkSpace";
import HomeList from "@/components/Ui/AllList/HomeList";

import ShopSpaceList from "@/components/Ui/AllList/ShopSpaceList";
import WorkSpaceList from "@/components/Ui/AllList/WorkSpaceList";
import { useEffect, useState } from "react";

const AllFlatListPage = () => {
  const [queries, setQueries] = useState({});
  const [queryString, setQueryString] = useState("");

  // const queryString = new URLSearchParams(queries).toString();
  const [listCategory, setListCategory] = useState("Home");

  useEffect(() => {
    const value = new URLSearchParams(queries).toString();
    setQueryString(value);
  }, [queries]);

  let listContent;

  if (listCategory === "Home") {
    listContent = (
      <>
        <FilterFlat setQueries={setQueries}></FilterFlat>
        <HomeList queryString={queryString} setQueries={setQueries}></HomeList>
      </>
    );
  }
  if (listCategory === "OfficeSpace") {
    listContent = (
      <>
        <FilterWorkSpace setQueries={setQueries} />
        <WorkSpaceList
          queryString={queryString}
          setQueries={setQueries}
        ></WorkSpaceList>
      </>
    );
  }

  if (listCategory === "ShopSpace") {
    listContent = (
      <>
        <FilterWorkSpace setQueries={setQueries} />
        <ShopSpaceList
          queryString={queryString}
          setQueries={setQueries}
        ></ShopSpaceList>
      </>
    );
  }

  return (
    <div className="">
      <FilterMainCategory
        listCategory={listCategory}
        setListCategory={setListCategory}
        setQueries={setQueries}
      ></FilterMainCategory>

      {listContent}
    </div>
  );
};

export default AllFlatListPage;
