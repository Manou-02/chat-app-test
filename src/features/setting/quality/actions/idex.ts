import { createAsyncThunk } from "@reduxjs/toolkit";
import { QualityService } from "../services/QualityServices";

export const fetchAllQuality = createAsyncThunk(
      "quality/fetchAllTransporter",
      async (params: any) => {
            try {
                  const { data } = await QualityService.getAllQaulity(params);
                  return data
            } catch (error: any) {
                  return {
                        data: { data: [] as any[], total: 0, skip: 0, limit: 0 },
                        isLoading: false,
                        error: error.message || "erreur de serveur",
                  };
            }
      }
)