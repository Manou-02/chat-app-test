import { createSlice } from "@reduxjs/toolkit";
import { fetchAllvehicleBrands } from "../actions";

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

const vehicleSlice = createSlice({
    name: "vehicleBrandReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllvehicleBrands.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllvehicleBrands.fulfilled, (state, action) => {
                state.response.data = action.payload.data;
                state.response.pagination = action.payload?.payload?.pagination;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(fetchAllvehicleBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
                state.response.data = []
            })
    }
})

export const vehicleBrandsReducers = vehicleSlice.reducer;