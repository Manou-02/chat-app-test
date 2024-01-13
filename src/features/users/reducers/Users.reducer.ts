import { createSlice } from "@reduxjs/toolkit"
import { fetchAllUsers } from "../actions";


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
      request2: {
            page: 1,
            itemsPerPage: 10
      },
}

const userSlice = createSlice({
      name: "userReducer",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
                  .addCase(fetchAllUsers.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                  })
                  .addCase(fetchAllUsers.fulfilled, (state, action) => {
                        state.response.data = action.payload.data;
                        state.response.pagination = action.payload?.payload?.pagination;
                        state.error = null;
                        state.isLoading = false;
                        state.request = initialState.request2
                  })
                  .addCase(fetchAllUsers.rejected, (state, action) => {
                        state.isLoading = false;
                        state.error = action.error.message || null;
                        state.response.data = []
                  })
      }
})


// export const { } = userSlice.actions;
export const usersReducers = userSlice.reducer;