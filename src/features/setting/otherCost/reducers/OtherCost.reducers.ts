import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOtherCosts } from "../actions";



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


const otherCostSlice = createSlice({
      name: "otherCostReducer",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(fetchAllOtherCosts.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                  })
                  .addCase(fetchAllOtherCosts.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.response.data = action.payload.data;
                        state.response.pagination = action.payload?.payload?.pagination;
                        state.error = null;
                  })
                  .addCase(fetchAllOtherCosts.rejected, (state, action) => {
                        state.isLoading = false;
                        state.response.data = [];
                        state.error = action.error.message || null;
                  })
      }
})

export const otherCostReducers = otherCostSlice.reducer