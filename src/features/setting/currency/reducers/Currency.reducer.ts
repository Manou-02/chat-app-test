


import { createSlice } from "@reduxjs/toolkit"
import { fetchAllCurrencies } from "../actions";


const initialState = {
      request: {
            page: 1,
            itemsPerPage: 10
      },
      response: {
            data: [],
            pagination: {}
      },
      isLoading: false,
      error: null as any
}


const currencySlice = createSlice({
      name: "currencyReducer",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(fetchAllCurrencies.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                  })
                  .addCase(fetchAllCurrencies.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.response.data = action.payload.data;
                        state.response.pagination = action.payload?.payload?.pagination;
                        state.error = null;
                  })
                  .addCase(fetchAllCurrencies.rejected, (state, action) => {
                        state.isLoading = false;
                        state.response.data = [];
                        state.error = action.error.message || null;
                  })
      }
})


export const currencyReducers = currencySlice.reducer;