import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://garden-planner-yyug.onrender.com/api/',
    prepareHeaders: (headers) => {
      const auth = localStorage.getItem('auth');
      if (!auth) return headers;

      const tokens = JSON.parse(auth);
      headers.append('Authorization', `Bearer ${tokens.access}`);

      return headers;
    },
    credentials: 'include',
    timeout: 30000,
  }),
  refetchOnReconnect: true,
  tagTypes: ['Auth', 'Gardens', 'Plants'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: '/register/',
        body,
        method: 'POST',
      }),
    }),
    getToken: builder.mutation({
      query: (body) => ({
        url: '/token/',
        method: 'POST',
        body,
      }),
      providesTags: ['Auth'],
    }),
    gardens: builder.query({
      query: () => ({
        url: '/garden/',
        method: 'GET',
      }),
      providesTags: ['Gardens'],
    }),
    createGarden: builder.mutation({
      query: (body) => ({
        url: '/garden/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Gardens'],
    }),
    plants: builder.query({
      query: () => ({
        url: '/plants/',
        method: 'GET',
      }),
      providesTags: ['Plants'],
    }),
    getPlant: builder.query({
      query: (id) => ({
        url: `/plants/${id}/`,
        method: 'GET',
      }),
    }),
    deletePlant: builder.mutation({
      query: (id) => ({
        url: `/plants/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plants'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetTokenMutation,
  useGardensQuery,
  useCreateGardenMutation,
  usePlantsQuery,
  useGetPlantQuery,
  useDeletePlantMutation,
} = api;

export default api;
