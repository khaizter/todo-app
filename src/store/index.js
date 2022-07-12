import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo";
import themeReducer from "./theme";
import authReducer from "./auth";
import errorReducer from "./error";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    theme: themeReducer,
    auth: authReducer,
    error: errorReducer,
  },
});

export default store;
