"use client";

import SkeletonFlatList from "@/components/Loading/SkeletonFlaList";
import SkeletonResFlatList from "@/components/Loading/SkeletonResFlatList";
import SkeletonTable from "@/components/Loading/SkeletonTable";
import FlatCard, { TFlat } from "@/components/Shared/FlatCard/FlatCard";
import FlatCardResponsive from "@/components/Shared/FlatCard/FlatCardResponsive";
import NotFoundData from "@/components/Shared/NotFoundData/NotFoundData";

import { TFlatData, TMeta } from "@/interfaces";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FlatList = () => {
  const [flats, setFlats] = useState<TFlat[]>([]);
  const [meta, setMeta] = useState<TMeta>();
  const [error, setError] = useState();
  const [isLoading, setIsLading] = useState(true);

  useEffect(() => {
    // const url = `http://localhost:5000/api/flats?`;
    const url = `https://server-flate-share.vercel.app/api/flats?`;

    const fetchFlats = async () => {
      setIsLading(true);
      try {
        const response = await axios.get(url);

        setFlats(response.data.data.flats);
       
        setMeta(response.data.data.meta);
        setIsLading(false);
      } catch (error: any) {
        setIsLading(false);
        setMeta(error);
        // eslint-disable-next-line no-console
        console.error("Error fetching flats:", error);
      }
    };

    fetchFlats();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Render error message if there's an error
  }
  if (isLoading) {
    return <SkeletonResFlatList></SkeletonResFlatList>;
  }
  if (flats.length <= 0) {
    return <NotFoundData text="No Flat/Home List Found"></NotFoundData>;
  }

  return (
    <div>
      <h3 className="text-sm sm:text-lg  md:text-xl mb-4">Best For You- </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
        {flats.slice(0, 7).map((flat, index) => (
          // <FlatCard key={index} flat={flat} />

          <FlatCardResponsive key={index} flat={flat} />
        ))}
      </div>
    </div>
  );
};

export default FlatList;
