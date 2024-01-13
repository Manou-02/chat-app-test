import { createAsyncThunk } from "@reduxjs/toolkit";
import { CurrencyServices } from "../services/Currency.services";


export const fetchAllCurrencies = createAsyncThunk(
      "currency/fetchAllCurrency",
      async (params: any) => {
            try {
                  const { data } = await CurrencyServices.getAllCurrencies(params);
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