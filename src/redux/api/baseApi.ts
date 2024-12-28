import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";

// const baseUrl="http://localhost:5000/api"
const baseUrl = "https://server-flate-share.vercel.app/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
