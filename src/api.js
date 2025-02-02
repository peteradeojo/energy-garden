import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://garden-planner-yyug.onrender.com/api/',
    prepareHeaders: (headers) => {
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: '/register',
        body,
        method: 'POST'
      }),
    }),
    getToken: builder.mutation({
      query: (body) => ({
        url: '/token',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = api;

export default api;