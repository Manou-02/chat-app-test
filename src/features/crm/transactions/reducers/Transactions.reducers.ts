
import { createSlice } from "@reduxjs/toolkit"
import { fetchAllTransactions } from "../actions";



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
      error: null as any,

}

const transactionsSlice = createSlice({
      name: "transactionReduceer",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(fetchAllTransactions.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                  })
                  .addCase(fetchAllTransactions.fulfilled, (state, action) => {
                        state.response.data = action.payload?.data;
                        state.response.pagination = action.payload?.payload?.pagination;
                        state.error = null;
                        state.isLoading = false;
                  })
                  .addCase(fetchAllTransactions.rejected, (state, action) => {
                        state.isLoading = false;
                        state.error = action.error.message || null;
                        state.response.data = []
                  })
      }
})

export const transactionReducers = transactionsSlice.reducer;