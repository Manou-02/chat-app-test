import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransporterServices } from "../services/Transporter.services";

export const fetchAllTransporters = createAsyncThunk(
      "transporter/fetchAllTransporter",
      async (params: any) => {
            try {
                  const { data } = await TransporterServices.getAllTransporter(params);
                  return data
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