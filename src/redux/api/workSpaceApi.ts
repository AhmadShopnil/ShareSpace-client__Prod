import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

import { IMeta } from "@/interfaces/common";

export const workSpaceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createWorkSpace: build.mutation({
      query: (data) => ({
        url: "/workSpaces/add",
        method: "POST",
        // contentType: 'multipart/form-data',
        data,
      }),
      invalidatesTags: [tagTypes.workSpaces],
    }),

    getAllWorkSpaces: build.query({
      query: (arg) => ({
        url: `/workSpaces?${arg}`,
        method: "GET",
        // params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          workSpaces: response,
          meta,
        };
      },
      providesTags: [tagTypes.workSpaces],
    }),

    getMyAllWorkSpaces: build.query({
      query: (arg) => ({
        url: `/workSpaces/myPostedWorkSpace`,
        method: "GET",
        // params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          workSpaces: response,
          meta,
        };
      },
      providesTags: [tagTypes.workSpaces],
    }),

    deleteWorkSpace: build.mutation({
      query: (workSpaceId) => ({
        url: `/workSpaces/${workSpaceId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.workSpaces],
    }),
    //get single workSpace
    getSingleWorkSpace: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/workSpaces/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.workSpaces],
    }),
    // update a workSpace
    updateWorkSpace: build.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `/workSpaces/${data.id}`,
          method: "PUT",
          data: data.updatedData,
        };
      },
      invalidatesTags: [tagTypes.workSpaces, tagTypes.users],
    }),
  }),
});

export const {
  useCreateWorkSpaceMutation,
  useDeleteWorkSpaceMutation,
  useGetSingleWorkSpaceQuery,
  useUpdateWorkSpaceMutation,
  useGetAllWorkSpacesQuery,
  useGetMyAllWorkSpacesQuery,
} = workSpaceApi;
