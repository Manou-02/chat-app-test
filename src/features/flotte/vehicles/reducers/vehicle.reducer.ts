import { createSlice } from "@reduxjs/toolkit";
import { fetchOneVehicle } from "../actions";

const initialState = {
    request: {
        page: 1,
        itemsPerPage: 10
    },
    response: {
        data: {},
        pagination: {}
    },
    isLoading: false,
    error: null as any
}

const vehicleSlice = createSlice({
    name: "vehicleReducer",
    initialState,
    reducers: {
        resetData: (state) => {
            state.response.data = initialState.response.data
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOneVehicle.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOneVehicle.fulfilled, (state, action) => {
                state.response.data = action.payload.data;
                state.response.pagination = action.payload?.payload?.pagination;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(fetchOneVehicle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
                state.response.data = []
            })
    }
})

export const { resetData } = vehicleSlice.actions;
export const vehicleReducers = vehicleSlice.reducer;