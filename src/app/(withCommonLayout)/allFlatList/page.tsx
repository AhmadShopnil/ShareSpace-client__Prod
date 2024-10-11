"use client";

import FilterFlat from "@/components/Shared/FilterFlat/FilterFlat";
import FilterMainCategory from "@/components/Shared/FilterMainCategory/FilterMainCategory";
import AllFlatList from "@/components/Ui/AllFlatLIst/AllFlatList";
import WorkSpaceList from "@/components/Ui/WorkSpaceList/WorkSpaceList";
import { useState } from "react";

const AllFlatListPage = () => {
  const [queries, setQueries] = useState({});
  const queryString = new URLSearchParams(queries).toString();
  const [listCategory, setListCategory] = useState("All");

  let listContent;

  if (listCategory === "Flat") {
    listContent = (
      <>
        <AllFlatList queryString={queryString}></AllFlatList>;
      </>
    );
  }
  if (listCategory === "WorkSpace") {
    listContent = <WorkSpaceList queryString={queryString}></WorkSpaceList>;
    // listContent = <h1>Workspace list..</h1>;
  }
  if (listCategory === "All") {
    listContent = (
      <div className="flex flex-col gap-10">
        <AllFlatList queryString={queryString}></AllFlatList>
        <WorkSpaceList queryString={queryString}></WorkSpaceList>;
      </div>
    );
  }
  if (listCategory === "OfficeSpace") {
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
      <FilterFlat setQueries={setQueries}></FilterFlat>

      {listContent}
    </div>
  );
};

export default AllFlatListPage;
