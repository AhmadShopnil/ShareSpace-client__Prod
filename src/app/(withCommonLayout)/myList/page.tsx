"use client";

import FlatCard from "@/components/Shared/FlatCard/FlatCard";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

const MyList = () => {
  const [data, setData] = useState([]);
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
    <div className="">
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
        {data.map((flat, index) => (
          <FlatCard key={index} flat={flat} />
        ))}
      </div>
    </div>
  );
};

export default MyList;
