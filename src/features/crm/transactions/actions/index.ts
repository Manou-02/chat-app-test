import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionServices } from "../services/Transactions.services";


export const fetchAllTransactions = createAsyncThunk(
      "transactions/fetchAllTransactions",
      async (params: any) => {

            try {
                  const { data } = await TransactionServices.getAllTransactions(params);
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