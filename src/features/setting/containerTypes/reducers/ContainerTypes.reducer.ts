import { createSlice } from "@reduxjs/toolkit";
import { fetchAllContainerTypes } from "../actions";

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

const containerTypesSlice = createSlice({
    name: "containerTypesReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllContainerTypes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllContainerTypes.fulfilled, (state, action) => {
                state.response.data = action.payload.data;
                state.response.pagination = action.payload?.payload?.pagination;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(fetchAllContainerTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
                state.response.data = []
            })
    }
});

export const containerTypesReducers = containerTypesSlice.reducer;