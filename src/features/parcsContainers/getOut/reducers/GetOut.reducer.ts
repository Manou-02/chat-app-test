import { createSlice } from "@reduxjs/toolkit"
import { fetchAllGetOut } from "../actions"




const initialState = {
      request: {
            page: 1,
            itemsPerPage: 10
      },
      requestReserved: {
            reservedStatus: true
      },
      response: {
            data: [],
            pagination: {}
      },
      isLoading: false,
      error: null as any
}

const getOutSlice = createSlice({
      name: "getOutReducer",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(fetchAllGetOut.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                  })
                  .addCase(fetchAllGetOut.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.response.data = action.payload.data;
                        state.response.pagination = action.payload?.payload?.pagination;
                        state.error = null;
                  })
                  .addCase(fetchAllGetOut.rejected, (state, action) => {
                        state.isLoading = false;
                        state.response.data = [];
                        state.error = action.error.message || null;
                  })
      }
})

export const getOutReducers = getOutSlice.reducer;