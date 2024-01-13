import { createSlice } from "@reduxjs/toolkit"
import { fetchAllServiceType } from "../actions";

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

const serviceTypeSlice = createSlice({
      name: "serviceTypeReducer",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(fetchAllServiceType.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                  })
                  .addCase(fetchAllServiceType.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.response.data = action.payload.data;
                        state.response.pagination = action.payload?.payload?.pagination;
                        state.error = null;
                  })
                  .addCase(fetchAllServiceType.rejected, (state, action) => {
                        state.isLoading = false;
                        state.response.data = [];
                        state.error = action.error.message || null;
                  })
      }
})

export const serviceTypeReducer = serviceTypeSlice.reducer;