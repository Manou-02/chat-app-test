import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerTypesServices } from "../services/CustomerTypes.services";


export const fetchAllCustomerTypes = createAsyncThunk(
    "customerTypes/fetchAllCustomerTypes",
    async (request: any) => {
        try {
            const { data } = await CustomerTypesServices.getAllCustomerTypes(request);
            return data;
        } catch (error: any) {
            return {
                data: { data: [] as any[], total: 0, skip: 0, limit: 0 },
                page: 1,
                isLoading: false,
                error: error.message || "erreur de serveur",
                limit: 5,
            };
        }
    }
)