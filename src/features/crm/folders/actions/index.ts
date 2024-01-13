import { createAsyncThunk } from "@reduxjs/toolkit";
import { FoldersServices } from "../services/Folders.services";
import { FoldersCreateInput } from "@/entities/crm/folders/FoldersCreateInput";

export const fetchAllFolders = createAsyncThunk(
    "setting/fetchAllFolders",
    async (request?: any) => {
        try {
            const res = await FoldersServices.getAllFolders(request);

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

export const fetchOneFolders = createAsyncThunk(
    "setting/fetchOneFolders",
    async (id: number) => {
        try {
            const res = await FoldersServices.getOneFolders(id);
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
    async (containerTypes: FoldersCreateInput) => {
        try {
            const res = await FoldersServices.createFolders(containerTypes);
            return res?.data;
        } catch (error: any) {
            return {
                error: error.message || "erreur de serveur"
            }
        }
    }
)