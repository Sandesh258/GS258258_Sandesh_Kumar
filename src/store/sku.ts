import { configureStore } from "@reduxjs/toolkit";
import skuReducer from "./skuSlice";

export const sku = configureStore({
  reducer: {
    sku: skuReducer, 
  },
});

export type RootState = ReturnType<typeof sku.getState>;
export type AppDispatch = typeof sku.dispatch;
