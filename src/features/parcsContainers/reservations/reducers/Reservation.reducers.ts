import { createSlice } from "@reduxjs/toolkit"
import { fetchAllReservation } from "../actions"


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


const reservationSlice = createSlice({
      name: "reservationReducer",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(fetchAllReservation.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                  })
                  .addCase(fetchAllReservation.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.response.data = action.payload?.data;
                        state.response.pagination = action.payload?.payload?.pagination;
                        state.error = null;
                  })
                  .addCase(fetchAllReservation.rejected, (state, action) => {
                        state.isLoading = false;
                        state.response.data = [];
                        state.error = action.error.message || null;
                  })
      }
})


export const resercationReducers = reservationSlice.reducer;