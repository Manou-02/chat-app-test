import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceTypeService } from "../services/ServiceType.services";

export const fetchAllServiceType = createAsyncThunk(
      "serviceType/fetchAllServiceType",
      async (params: any) => {
            try {
                  const { data } = await ServiceTypeService.getAllServiceType(params);
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