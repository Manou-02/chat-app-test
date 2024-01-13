import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetInService } from "../services/GetIn.services";


export const fetchAllGetIn = createAsyncThunk(
      "getIn/fetchAll",
      async (request: any) => {
            try {
                  const { data } = await GetInService.getAllGetIn(request);
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