import { createAsyncThunk } from "@reduxjs/toolkit";
import { BanksServices } from "../services/BankServices";


export const fetchAllBanks = createAsyncThunk(
      "banks/fetchAllBanks",
      async (params: any) => {
            try {
                  const { data } = await BanksServices.getAllBanks(params);
                  return data;
            } catch (error: any) {
                  return {
                        data: { data: [] as any[], total: 0, skip: 0, limit: 0 },
                        isLoading: false,
                        error: error.message || "erreur de serveur",
                  }
            }
      }
)