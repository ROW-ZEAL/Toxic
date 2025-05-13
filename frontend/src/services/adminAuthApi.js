import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from './LocalStorageService';

export const adminAuthApi = createApi({
  reducerPath: 'adminAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/admin/',
  }),
  endpoints: (builder) => ({
    registerAdmin: builder.mutation({
      query: (user) => ({
        url: 'register/',
        method: 'POST',
        body: user,
        headers: {
          'Content-type': 'application/json',
        }
      })
    }),
    getAdminStatus: builder.query({
      query: () => ({
        url: 'admin/status',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()?.access_token}`,
        }
      })
    }),
    getAdminRequests: builder.query({
      query: () => ({
        url: 'admin/requests',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()?.access_token}`,
        }
      })
    }),
    approveAdminRequest: builder.mutation({
      query: (userId) => ({
        url: `admin/approve/${userId}`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()?.access_token}`,
        }
      })
    }),
  }),
});

export const { 
  useRegisterAdminMutation,
  useGetAdminStatusQuery,
  useGetAdminRequestsQuery,
  useApproveAdminRequestMutation
} = adminAuthApi;
