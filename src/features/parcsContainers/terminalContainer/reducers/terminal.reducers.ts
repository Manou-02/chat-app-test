import { createSlice } from "@reduxjs/toolkit"
import { fetchAllTerminal } from "../actions"



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

const terminalSlice = createSlice({
      name: "terminalReducer",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(fetchAllTerminal.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                  })
                  .addCase(fetchAllTerminal.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.response.data = action.payload?.data;
                        state.response.pagination = action.payload?.payload?.pagination;
                        state.error = null;
                        state.isLoading = false;
                  })
                  .addCase(fetchAllTerminal.rejected, (state, action) => {
                        state.isLoading = false;
                        state.response.data = [];
                        state.error = action.error.message || null;
                  })
      }
});


export const terminalReducers = terminalSlice.reducer;