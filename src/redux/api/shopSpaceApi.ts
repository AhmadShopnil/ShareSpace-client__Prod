import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

import { IMeta } from "@/interfaces/common";

export const shopSpaceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createShopSpace: build.mutation({
      query: (data) => ({
        url: "/shopSpaces/add",
        method: "POST",
        // contentType: 'multipart/form-data',
        data,
      }),
      invalidatesTags: [tagTypes.shopSpaces],
    }),

    getAllShopSpaces: build.query({
      query: (arg) => ({
        url: `/shopSpaces?${arg}`,
        method: "GET",
        // params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          shopSpaces: response,
          meta,
        };
      },
      providesTags: [tagTypes.shopSpaces],
    }),

    getAllShopSpacesByAdmin: build.query({
      query: (arg) => ({
        url: `/shopSpaces/admin?${arg}`,
        method: "GET",
        // params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          shopSpaces: response,
          meta,
        };
      },
      providesTags: [tagTypes.shopSpaces],
    }),
    getMyAllShopSpaces: build.query({
      query: (arg) => ({
        url: `/shopSpaces/myPostedshopSpace`,
        method: "GET",
        // params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          shopSpaces: response,
          meta,
        };
      },
      providesTags: [tagTypes.shopSpaces],
    }),

    deleteShopSpace: build.mutation({
      query: (shopSpaceId) => ({
        url: `/shopSpaces/${shopSpaceId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shopSpaces],
    }),
    //get single shopSpace
    getSingleShopSpace: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/shopSpaces/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.shopSpaces],
    }),
    // update a shopSpace
    updateShopSpace: build.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `/shopSpaces/${data.id}`,
          method: "PUT",
          data: data.updatedData,
        };
      },
      invalidatesTags: [tagTypes.shopSpaces, tagTypes.users],
    }),
  }),
});

export const {
  useCreateShopSpaceMutation,
  useDeleteShopSpaceMutation,
  useGetSingleShopSpaceQuery,
  useUpdateShopSpaceMutation,
  useGetAllShopSpacesQuery,
  useGetMyAllShopSpacesQuery,
  useGetAllShopSpacesByAdminQuery,
} = shopSpaceApi;
