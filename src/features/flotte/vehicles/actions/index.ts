import { createAsyncThunk } from "@reduxjs/toolkit";
import { VehiclesServices } from "../services/Vehicles.services";
import { VehicleCreateInput } from "@/entities/flotte/VehicleCreateInput";

export const fetchAllVehicles = createAsyncThunk(
    "vehicles/fetchAllVehicles",
    async (request?: any) => {
        try {
            const res = await VehiclesServices.getAllVehicles(request);
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

export const fetchOneVehicle = createAsyncThunk(
    "vehicles/fetchOneVehicle",
    async (id: number) => {
        try {
            const res = await VehiclesServices.getOneVehicles(id);
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

export const createOneVehicle = createAsyncThunk(
    "vehicles/createOneVehicle",
    async (vehicle: VehicleCreateInput) => {
        try {
            const res = await VehiclesServices.createVehicle(vehicle);
            return res?.data;
        } catch (error: any) {
            return {
                error: error.message || "erreur de serveur"
            }
        }
    }
)