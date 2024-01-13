import { createSlice } from "@reduxjs/toolkit";
import { fetchAllAverageCosts } from "../actions";

const initialState = {
    request: {
        page: 1,
        itemsPerPage: 3
    },
    response: {
        data: [],
        pagination: {}
    },
    isLoading: false,
    error: null as any
}

const averageCostsSlice = createSlice({
    name: "averageCostsReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAverageCosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllAverageCosts.fulfilled, (state, action) => {
                state.response.data = action.payload.data;
                state.response.pagination = action.payload?.payload?.pagination;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(fetchAllAverageCosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
                state.response.data = []
            })
    }
});

export const averageCostsReducers = averageCostsSlice.reducer;