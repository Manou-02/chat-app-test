import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetOutService } from "../services/GetOut.services";


export const fetchAllGetOut = createAsyncThunk(
      "getOut/fetchAll",
      async (params: any) => {
            try {
                  const { data } = await GetOutService.getAllGetOut(params);
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

export const fetchAllContainer = createAsyncThunk(
      "getOut/fetchAllContainer",
      async (params: any) => {
            try {
                  const { data } = await GetOutService.getAllContainer(params);
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