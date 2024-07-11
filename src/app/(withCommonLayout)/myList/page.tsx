"use client";

import MyPostedList from "@/components/MyPostedTable/MyPostedLIst";
import { TFlatData } from "@/interfaces";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

const MyList = () => {
  const [data, setData] = useState<TFlatData[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/flats/myPostedHouse");
        // Log response data
        setData(response?.data?.data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error state
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Render error message if there's an error
  }

  return (
    <div className=" w-full">
      {data.length > 0 ? (
        <MyPostedList data={data}></MyPostedList>
      ) : (
        <div className="mx-auto w-3/4 md:w-1/3 p-4  mt-14 bg-teal-50">
          <h1 className="text-center">You Do not Post Any Flat/House </h1>
        </div>
      )}
    </div>
  );
};

export default MyList;
