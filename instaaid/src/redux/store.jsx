import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import cartReducer from "./Cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
