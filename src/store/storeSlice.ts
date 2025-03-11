import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Store {
  id: string;
  label: string;
  city: string;
  state: string;
}

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [
    { id: "ST035", label: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },
    { id: "ST046", label: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
    { id: "ST064", label: "Dallas Ranch Supply", city: "Dallas", state: "TX" },
    { id: "ST066", label: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
    { id: "ST073", label: "Nashville Melody Music Store", city: "Nashville", state: "TN" },
    { id: "ST074", label: "New York Empire Eats", city: "New York", state: "NY" },
    { id: "ST091", label: "Denver Peaks Outdoor", city: "Denver", state: "CO" },
    { id: "ST094", label: "Philadelphia Liberty Market", city: "Philadelphia", state: "PA" },
    { id: "ST097", label: "Boston Harbor Books", city: "Boston", state: "MA" },
    { id: "ST101", label: "Austin Vibe Co.", city: "Austin", state: "TX" },
    { id: "ST131", label: "Los Angeles Luxe", city: "Los Angeles", state: "CA" },
    { id: "ST150", label: "Houston Harvest Market", city: "Houston", state: "TX" },
    { id: "ST151", label: "Portland Evergreen Goods", city: "Portland", state: "OR" },
    { id: "ST156", label: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
    { id: "ST163", label: "Las Vegas Neon Treasures", city: "Las Vegas", state: "NV" },
    { id: "ST175", label: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
    { id: "ST176", label: "Miami Breeze Apparel", city: "Miami", state: "FL" },
    { id: "ST177", label: "San Diego Wave Surf Shop", city: "San Diego", state: "CA" },
    { id: "ST193", label: "Charlotte Queen’s Closet", city: "Charlotte", state: "NC" },
    { id: "ST208", label: "Detroit Motor Gear", city: "Detroit", state: "MI" },
  ],
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((store) => store.id !== action.payload);
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.stores.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
    reorderStores: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      if (toIndex >= 0 && toIndex < state.stores.length) {
        const movedItem = state.stores.splice(fromIndex, 1)[0];
        state.stores.splice(toIndex, 0, movedItem);
      }
    },
  },
});

export const { addStore, deleteStore, updateStore, reorderStores } = storeSlice.actions;
export default storeSlice.reducer;
