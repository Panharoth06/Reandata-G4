import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chohortAnalysis = createApi({
  reducerPath: "chohortAnalysis",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT, // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["ChohortAnalysis"],
  endpoints: (builder) => ({
    getChohortAnalysis: builder.query({
      query: () => "/rpc/get_cohort_analysis", 
      providesTags: ["ChohortAnalysis"],
    }),
  }),
});

export const { useGetChohortAnalysisQuery } = chohortAnalysis;
