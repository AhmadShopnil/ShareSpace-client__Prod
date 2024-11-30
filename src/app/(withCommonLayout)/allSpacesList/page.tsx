"use client";
import FilterFlat from "@/components/Shared/Filter/FilterFlat";
import FilterMainCategory from "@/components/Shared/Filter/FilterMainCategory";
import FilterWorkSpace from "@/components/Shared/Filter/FilterWorkSpace";
import HomeList from "@/components/Ui/HomeList/HomeList";

import ShopSpaceList from "@/components/Ui/ShopSpaceList/ShopSpaceList";
import WorkSpaceList from "@/components/Ui/WorkSpaceList/WorkSpaceList";
import { useState } from "react";

const AllFlatListPage = () => {
  const [queries, setQueries] = useState({});
  const queryString = new URLSearchParams(queries).toString();
  const [listCategory, setListCategory] = useState("Home");

  let listContent;

  // if (listCategory === "All") {
  //   listContent = (
  //     <>
  //       <FilterFlat setQueries={setQueries}></FilterFlat>
  //       <div className="flex flex-col gap-10">
  //         <AllFlatList queryString={queryString}></AllFlatList>
  //         <WorkSpaceList queryString={queryString}></WorkSpaceList>
  //         <ShopSpaceList queryString={queryString}></ShopSpaceList>
  //       </div>
  //     </>
  //   );
  // }

  if (listCategory === "Home") {
    listContent = (
      <>
        <FilterFlat setQueries={setQueries}></FilterFlat>
        <HomeList queryString={queryString}></HomeList>
      </>
    );
  }
  if (listCategory === "OfficeSpace") {
    listContent = (
      <>
        <FilterWorkSpace setQueries={setQueries} />
        <WorkSpaceList queryString={queryString}></WorkSpaceList>
      </>
    );
  }

  if (listCategory === "ShopSpace") {
    listContent = (
      <>
        <FilterWorkSpace setQueries={setQueries} />
        <ShopSpaceList queryString={queryString}></ShopSpaceList>
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
