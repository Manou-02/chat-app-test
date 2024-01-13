import { createSlice } from "@reduxjs/toolkit";
import { fetchAllShippingCompanies } from "../actions";

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

const shippingCompaniesSlice = createSlice({
    name: "shippingCompanyReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllShippingCompanies.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllShippingCompanies.fulfilled, (state, action) => {
                state.response.data = action.payload.data;
                state.response.pagination = action.payload?.payload?.pagination;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(fetchAllShippingCompanies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
                state.response.data = []
            })
    }
})

export const shippingCompaniesReducers = shippingCompaniesSlice.reducer;