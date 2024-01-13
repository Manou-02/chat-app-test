import { createSlice } from "@reduxjs/toolkit"
import { fetchAllCustomerTypes } from "../actions"


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

const clientSlice = createSlice({
    name: "customerTypesReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCustomerTypes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllCustomerTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.response.data = action.payload.data;
                state.response.pagination = action.payload?.payload?.pagination;
                state.error = null;
            })
            .addCase(fetchAllCustomerTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.response.data = [];
                state.error = action.error.message || null;
            })
    }
})

export const CustomerTypesReducers = clientSlice.reducer;