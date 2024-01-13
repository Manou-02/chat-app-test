import { createAsyncThunk } from "@reduxjs/toolkit";
import { ShippingCompaniesServices } from "../services/ShippingCompanies.services";

export const fetchAllShippingCompanies = createAsyncThunk(
    "setting/fetchAllShippingCompanies",
    async (request?: any) => {
        try {
            const res = await ShippingCompaniesServices.getAllShippingCompanies(request);
            return res?.data;
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