import { createSlice } from "@reduxjs/toolkit"
import { fetchAllGetIn } from "../actions"

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

const getInSlice = createSlice({
      name: "getInReducer",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(fetchAllGetIn.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                  })
                  .addCase(fetchAllGetIn.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.response.data = action.payload.data;
                        state.response.pagination = action.payload?.payload?.pagination;
                        state.error = null;
                  })
                  .addCase(fetchAllGetIn.rejected, (state, action) => {
                        state.isLoading = false;
                        state.response.data = [];
                        state.error = action.error.message || null;
                  })
      }
})


export const getInReducer = getInSlice.reducer;