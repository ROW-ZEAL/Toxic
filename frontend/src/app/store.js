import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../services/userAuthApi";
import { adminAuthApi } from "../services/adminAuthApi";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import adminReducer from "../features/admin/adminSlice";
export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware, adminAuthApi.middleware),
});

setupListeners(store.dispatch);
