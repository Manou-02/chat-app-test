import { createSlice } from "@reduxjs/toolkit";
import { fetchAllFolders } from "../actions";

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

const foldersSlice = createSlice({
    name: "foldersReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFolders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllFolders.fulfilled, (state, action) => {
                state.response.data = action.payload.data;
                state.response.pagination = action.payload?.payload?.pagination;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(fetchAllFolders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
                state.response.data = []
            })
    }
});

export const foldersReducers = foldersSlice.reducer;