import { createAsyncThunk } from "@reduxjs/toolkit";
import { OtherCostServices } from "../services/OtherCost.services";


export const fetchAllOtherCosts = createAsyncThunk(
      "otherCosts/fetchAllOtherCosts",
      async (params: any) => {
            try {
                  const { data } = await OtherCostServices.getAllOtherCosts(params);
                  return data;
            } catch (error: any) {
                  return {
                        data: { data: [] as any[], total: 0, skip: 0, limit: 0 },
                        isLoading: false,
                        error: error.message || "erreur de serveur",
                  };
            }
      }
)