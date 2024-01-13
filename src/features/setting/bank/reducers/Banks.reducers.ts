import { createSlice } from "@reduxjs/toolkit"
import { fetchAllBanks } from "../actions";


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


const bankSlice = createSlice({
      name: "bankReducer",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(fetchAllBanks.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                  })
                  .addCase(fetchAllBanks.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.response.data = action.payload.data;
                        state.response.pagination = action.payload?.payload?.pagination;
                        state.error = null;
                  })
                  .addCase(fetchAllBanks.rejected, (state, action) => {
                        state.isLoading = false;
                        state.response.data = [];
                        state.error = action.error.message || null;
                  })
      }
})

export const banksReducers = bankSlice.reducer;