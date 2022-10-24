import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEmployeeWithoutPasswordAndRole, IEmployee } from '../../interfaces/employee';
import { setCredentials, removeCredentials} from './authSlice';
import { selectCurrentAccessToken } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:1337',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = selectCurrentAccessToken;
    if(token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers;
  }
})

// const baseQueryWithAuth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if(result?.error?.originalStatus) {
    
//   }
// }

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    createEmployee: builder.query<IEmployee, string>({
      query: (employee) => `pokemon`,
    }),
    getEmployees: builder.query<IEmployeeWithoutPasswordAndRole[], string>({
      query: () => `pokemon`,
    }),
    getEmployee: builder.query<IEmployeeWithoutPasswordAndRole, string>({
      query: (employeeId) => `pokemon/${employeeId}`,
    }),
    updateEmployee: builder.query<IEmployee, string>({
      query: (employeeId) => `pokemon/${employeeId}`,
    }),
    deleteEmployee: builder.query<string, string>({
      query: (employeeId) => `pokemon/${employeeId}`,
    }),
  }),
})

export const { useCreateEmployeeQuery, useGetEmployeesQuery, useGetEmployeeQuery, useUpdateEmployeeQuery, useDeleteEmployeeQuery } = apiSlice;