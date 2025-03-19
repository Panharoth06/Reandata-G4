import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authApi from "./services/authSlice";
import uploadFileApi from "./services/uploadFileSlice";

 const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [uploadFileApi.reducerPath]: uploadFileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, uploadFileApi.middleware),
});

setupListeners(store.dispatch);

export default store;
