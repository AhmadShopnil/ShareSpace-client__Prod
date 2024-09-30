import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

import { IMeta } from '@/interfaces/common';


export const flatApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      createFlat: build.mutation({
         query: (data) => ({
            url: '/flats/add',
            method: 'POST',
            // contentType: 'multipart/form-data',
            data,
         }),
         invalidatesTags: [tagTypes.flats],
      }),

      getAllFlats: build.query({
         query: (arg) => ({
            url: `/flats?${arg}`,
            method: 'GET',
            // params: arg,
         }),
         transformResponse: (response:any, meta: IMeta) => {
            return {
               flats: response,
               meta,
            };
         },
         providesTags: [tagTypes.flats],
      }),


      getMyAllFlats: build.query({
         query: (arg) => ({
            url: `/flats/myPostedHouse`,
            method: 'GET',
            // params: arg,
         }),
         transformResponse: (response:any, meta: IMeta) => {
            return {
               flats: response,
               meta,
            };
         },
         providesTags: [tagTypes.flats],
      }),

      deleteFlat: build.mutation({
         query: (id) => ({
            url: `/flat/soft/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: [tagTypes.flats],
      }),
      //get single flat
      getSingleFlat: build.query({
         query: (id: string | string[] | undefined) => ({
            url: `/flat/${id}`,
            method: 'GET',
         }),
         providesTags: [tagTypes.flats],
      }),
      // update a flat
      updateFlat: build.mutation({
         query: (data) => {
            // console.log(data);
            return {
               url: `/flat/${data.id}`,
               method: 'PATCH',
               data: data.body,
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
   useGetMyAllFlatsQuery
} = flatApi;
