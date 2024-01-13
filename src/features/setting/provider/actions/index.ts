import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProviderService } from "../services/Provider.services";


export const fetchAllProvider = createAsyncThunk(
      "provider/fetchAllProvider",
      async (params: any) => {
            try {
                  const { data } = await ProviderService.getAllProvider(params);
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