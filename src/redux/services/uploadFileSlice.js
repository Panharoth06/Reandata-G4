import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const uploadFileApi = createApi({
  reducerPath: "uploadFileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_UPLOADFILE || "http://localhost:3000",
  }),
  endpoints: (build) => ({
    imageUpload: build.mutation({
      query: (data) => ({
        url: "/image",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useImageUploadMutation } = uploadFileApi;
export default uploadFileApi;