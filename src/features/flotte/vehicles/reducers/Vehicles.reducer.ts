import { createSlice } from "@reduxjs/toolkit";
import { createOneVehicle, fetchAllVehicles } from "../actions";

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

const initialStateOnCreation = {
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
    name: "vehiclesReducer",
    initialState,
    reducers: {
        setCreatedItem: (state, action) => {
            state.response.data = [...state.response.data, action.payload] as any
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllVehicles.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllVehicles.fulfilled, (state, action) => {
                state.response.data = action.payload.data;
                state.response.pagination = action.payload?.payload?.pagination;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(fetchAllVehicles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
                state.response.data = []
            })
    }
});

export const vehiclesReducers = vehicleSlice.reducer;

const vehicleOnCreate = createSlice({
    name: "vehicleOnCreateReducer",
    initialState: initialStateOnCreation,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOneVehicle.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createOneVehicle.fulfilled, (state, action) => {
                state.response.data.push(action.payload.data as never);
                state.response.pagination = action.payload?.payload?.pagination;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(createOneVehicle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
                state.response.data = []
            })
    }
})

export const vehicleOnCreateReducers = vehicleOnCreate.reducer;