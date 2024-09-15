// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Ensure the correct import path

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
