import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

import { IMeta } from "@/interfaces/common";

export const flatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFlat: build.mutation({
      query: (data) => ({
        url: "/flats/add",
        method: "POST",
        // contentType: 'multipart/form-data',
        data,
      }),
      invalidatesTags: [tagTypes.flats],
    }),

    getAllFlats: build.query({
      query: (arg) => ({
        url: `/flats?${arg}`,
        method: "GET",
        // params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          flats: response,
          meta,
        };
      },
      providesTags: [tagTypes.flats],
    }),

    getAllFlatsByAdmin: build.query({
      query: (arg) => ({
        url: `/flats/admin?${arg}`,
        method: "GET",
        // params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          flats: response,
          meta,
        };
      },
      providesTags: [tagTypes.flats],
    }),

    getMyAllFlats: build.query({
      query: () => ({
        url: `/flats/myPostedHouse`,
        method: "GET",
        // params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          flats: response,
          meta,
        };
      },
      providesTags: [tagTypes.flats],
    }),

    deleteFlat: build.mutation({
      query: (flatId) => ({
        url: `/flats/${flatId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.flats],
    }),
    //get single flat
    getSingleFlat: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/flat/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.flats],
    }),
    // update a flat
    updateFlat: build.mutation({
      query: (data) => {
        // console.log("from redux hook", data);
        return {
          url: `/flats/${data.id}`,
          method: "PUT",
          data: data.updatedData,
        };
      },
      invalidatesTags: [tagTypes.flats, tagTypes.users],
    }),
  }),
});

export const {
  useCreateFlatMutation,
  useDeleteFlatMutation,
  useGetSingleFlatQuery,
  useUpdateFlatMutation,
  useGetAllFlatsQuery,
  useGetMyAllFlatsQuery,
  useGetAllFlatsByAdminQuery,
} = flatApi;
