"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import FlatCard, { TFlat } from "@/components/Shared/FlatCard/FlatCard";
import { TMeta } from "@/interfaces";
import SkeletonFlatList from "@/components/Loading/SkeletonFlaList";
import FlatCardResponsive from "@/components/Shared/FlatCard/FlatCardResponsive";
import SkeletonResFlatList from "@/components/Loading/SkeletonResFlatList";
import NotFoundData from "@/components/Shared/NotFoundData/NotFoundData";

const AllFlatList = ({ queryString }: { queryString: any }) => {
  const [flats, setFlats] = useState<TFlat[]>([]);
  const [meta, seMeta] = useState<TMeta>();
  const [isLoading, setIsLoading] = useState(true);

  // const res = await fetch("https://server-flate-share.vercel.app/api/flats");
  // const { data } = await res.json();
  // const flats: TFlat[] = data.flats;
  // const meta: TMeta = data.meta;

  useEffect(() => {
    // const url = `http://localhost:5000/api/flats?${queryString}`;
    const url = `https://server-flate-share.vercel.app/api/flats?${queryString}`;

    const fetchFlats = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);

        setFlats(response.data.data.flats);
        seMeta(response.data.data.meta);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // eslint-disable-next-line no-console
        console.error("Error fetching flats:", error);
      }
    };

    fetchFlats();
  }, [queryString]);

  if (isLoading) {
    return <SkeletonResFlatList></SkeletonResFlatList>;
  }

  if (flats.length <= 0) {
    return <NotFoundData text="No Flat/Home List Found"></NotFoundData>;
  }

  return (
    <div className="mt-2">
      <h1 className="mb-2 text-md">Total: {meta?.total}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
        {flats?.map((flat, index) => (
          <FlatCardResponsive key={index} flat={flat} />
        ))}
      </div>
    </div>
  );
};

export default AllFlatList;
