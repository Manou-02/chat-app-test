import { createAsyncThunk } from "@reduxjs/toolkit";
import { CentersService } from "../services/centers.services";


export const fetchAllCenters = createAsyncThunk(
      "centers/fetchAllCenters",
      async (params: any) => {
            try {
                  const { data } = await CentersService.getAllCennters(params);
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