import { createAsyncThunk } from "@reduxjs/toolkit";
import { AverageCostsServices } from "../services/AverageCosts.services";
import { AverageCostsCreateInput } from "@/entities/setting/averageCosts/AverageCostsCreateInput";

export const fetchAllAverageCosts = createAsyncThunk(
    "setting/fetchAllAverageCosts",
    async (request?: any) => {
        try {
            const res = await AverageCostsServices.getAllAverageCosts(request);

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

export const fetchOneAverageCosts = createAsyncThunk(
    "setting/fetchOneAverageCosts",
    async (id: number) => {
        try {
            const res = await AverageCostsServices.getOneAverageCosts(id);
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

export const createOneAverageCost = createAsyncThunk(
    "vehicles/createOneAverageCost",
    async (containerTypes: AverageCostsCreateInput) => {
        try {
            const res = await AverageCostsServices.createAverageCosts(containerTypes);
            return res?.data;
        } catch (error: any) {
            return {
                error: error.message || "erreur de serveur"
            }
        }
    }
)