import { createAsyncThunk } from "@reduxjs/toolkit";
import { VehicleModelsServices } from "../services/VehicleModels.services";

export const fetchAllvehicleModels = createAsyncThunk(
    "vehicles/fetchAllvehicleModels",
    async (request?: any) => {
        try {
            const res = await VehicleModelsServices.getAllVehicleModel(request);
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