import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContainerTypesServices } from "../services/ContainerTypes.services";
import { ContainerTypesCreateInput } from "@/entities/setting/containerTypes/ContainerTypesCreateInput";

export const fetchAllContainerTypes = createAsyncThunk(
    "setting/fetchAllContainerTypes",
    async (request?: any) => {
        try {
            const res = await ContainerTypesServices.getAllContainerTypes(request);

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

export const fetchOneContainerTypes = createAsyncThunk(
    "setting/fetchOneContainerTypes",
    async (id: number) => {
        try {
            const res = await ContainerTypesServices.getOneContainerTypes(id);
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

export const createOneContainerTypes = createAsyncThunk(
    "vehicles/createOneVehicle",
    async (containerTypes: ContainerTypesCreateInput) => {
        try {
            const res = await ContainerTypesServices.createContainerTypes(containerTypes);
            return res?.data;
        } catch (error: any) {
            return {
                error: error.message || "erreur de serveur"
            }
        }
    }
)