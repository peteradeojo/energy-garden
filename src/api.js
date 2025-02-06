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
  tagTypes: ['Auth', 'Gardens', 'Plants', 'Schedule'],
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
    removeFromGarden: builder.mutation({
      query: (id) => ({
        url: `/garden-plants/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plants', 'Gardens'],
      providesTags: ['Gardens', 'Plants'],
    }),
    addToGarden: builder.mutation({
      query: (body) => ({
        url: '/garden-plants/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Plants', 'Gardens'],
      providesTags: ['Gardens', 'Plants'],
    }),
    markWatered: builder.mutation({
      query: (id) => ({
        url: `/watering-schedules/${id}/mark-watered/`,
        method: 'POST',
      }),
      invalidatesTags: ['Plants', 'Gardens'],
      providesTags: ['Gardens', 'Plants'],
    }),
    getWaterSchedule: builder.query({
      query: (id) => ({
        url: `/watering-schedules/${id}/`,
      }),
      providesTags: ['Schedule'],
    }),
    notifications: builder.query({
      query: () => ({
        url: '/notifications/',
      }),
    }),
    markNotificationAsRead: builder.mutation({
      query: (body) => ({
        body,
        method: 'POST',
        url: '/notifications/',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        method: 'POST',
        url: '/logout/',
      }),
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
  useRemoveFromGardenMutation,
  useAddToGardenMutation,
  useMarkWateredMutation,
  useGetWaterScheduleQuery,
  useNotificationsQuery,
  useLogoutMutation,
  useMarkNotificationAsReadMutation,
} = api;

export default api;
