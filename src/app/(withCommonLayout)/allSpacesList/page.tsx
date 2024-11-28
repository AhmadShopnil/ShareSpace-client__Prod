"use client";
import FilterFlat from "@/components/Shared/Filter/FilterFlat";
import FilterMainCategory from "@/components/Shared/Filter/FilterMainCategory";
import FilterWorkSpace from "@/components/Shared/Filter/FilterWorkSpace";
import AllFlatList from "@/components/Ui/AllFlatLIst/AllFlatList";
import WorkSpaceList from "@/components/Ui/WorkSpaceList/WorkSpaceList";
import { useState } from "react";

const AllFlatListPage = () => {
  const [queries, setQueries] = useState({});
  const queryString = new URLSearchParams(queries).toString();
  const [listCategory, setListCategory] = useState("All");

  let listContent;

  if (listCategory === "All") {
    listContent = (
      <>
        <FilterFlat setQueries={setQueries}></FilterFlat>
        <div className="flex flex-col gap-10">
          <AllFlatList queryString={queryString}></AllFlatList>
          <WorkSpaceList queryString={queryString}></WorkSpaceList>;
        </div>
      </>
    );
  }

  if (listCategory === "Flat") {
    listContent = (
      <>
        <FilterFlat setQueries={setQueries}></FilterFlat>
        <AllFlatList queryString={queryString}></AllFlatList>;
      </>
    );
  }
  if (listCategory === "OfficeSpace") {
    listContent = (
      <>
        <FilterWorkSpace setQueries={setQueries} />
        <WorkSpaceList queryString={queryString}></WorkSpaceList>;
      </>
    );
  }

  if (listCategory === "ShopSpace") {
    listContent = (
      <div className="flex flex-col gap-10">
        <h1 className="text-center">Cooming Soon..</h1>
      </div>
    );
  }

  return (
    <div className="">
      <FilterMainCategory
        listCategory={listCategory}
        setListCategory={setListCategory}
      ></FilterMainCategory>

      {listContent}
    </div>
  );
};

export default AllFlatListPage;
