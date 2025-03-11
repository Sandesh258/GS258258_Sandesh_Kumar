import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SKU } from "../types";

interface SKUState {
  skus: SKU[];
}

const initialState: SKUState = {
  skus: [
    { id: "SKU001", name: "Product A", price: 10, cost: 5 },
    { id: "SKU002", name: "Product B", price: 12, cost: 6 },
    { id: "SKU003", name: "Product C", price: 8, cost: 4 },
    { id: "SKU004", name: "Product D", price: 9, cost: 5 },
    { id: "SKU005", name: "Product E", price: 11, cost: 7 },
    { id: "SKU006", name: "Product F", price: 14, cost: 6 },
    { id: "SKU007", name: "Product G", price: 13, cost: 6 },
    { id: "SKU008", name: "Product H", price: 7, cost: 3 },
    { id: "SKU009", name: "Product I", price: 15, cost: 8 },
    { id: "SKU010", name: "Product J", price: 10, cost: 4 },
  ],
};

const skuSlice = createSlice({
  name: "sku",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.skus.push(action.payload);
    },
    deleteSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
    updateSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.skus.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
  },
});

export const { addSKU, deleteSKU, updateSKU } = skuSlice.actions;
export default skuSlice.reducer;
