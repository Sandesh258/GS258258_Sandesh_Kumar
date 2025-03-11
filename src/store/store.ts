import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice"; 
import skuReducer from "./skuSlice"; 

export const store = configureStore({
  reducer: {
    store: storeReducer,
    sku: skuReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
