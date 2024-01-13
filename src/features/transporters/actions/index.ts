import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransportersServices } from "../services/Transporters.services";


export const fetchAllTransporters = createAsyncThunk(
    "transporters/fetchAllTransporters",
    async (request: any) => {
        try {
            const res = await TransportersServices.getAllTransporters(request);
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