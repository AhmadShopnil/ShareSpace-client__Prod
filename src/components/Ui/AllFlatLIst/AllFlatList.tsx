"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import FlatCard, { TFlat } from "@/components/Shared/FlatCard/FlatCard";
import { TMeta } from "@/interfaces";

const AllFlatList = ({ queryString }: { queryString: any }) => {
  const [flats, setFlats] = useState<TFlat[]>([]);
  const [meta, seMeta] = useState<TMeta>();

  // const res = await fetch("https://server-flate-share.vercel.app/api/flats");
  // const { data } = await res.json();
  // const flats: TFlat[] = data.flats;
  // const meta: TMeta = data.meta;

  useEffect(() => {
    // const url = `http://localhost:5000/api/flats?${queryString}`;
    const url = `https://server-flate-share.vercel.app/api/flats?${queryString}`;

    const fetchFlats = async () => {
      try {
        const response = await axios.get(
          // `https://server-flate-share.vercel.app/api/flats`
          url
        );

        setFlats(response.data.data.flats);
        seMeta(response.data.data.meta);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching flats:", error);
      }
    };

    fetchFlats();
  }, [queryString]);

  return (
    <div className="mt-2">
      <h1 className="mb-2 text-md">Total: {meta?.total}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
        {flats?.map((flat, index) => (
          <FlatCard key={index} flat={flat} />
        ))}
      </div>
    </div>
  );
};

export default AllFlatList;
