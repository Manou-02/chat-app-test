import { createAsyncThunk } from "@reduxjs/toolkit";
import { TerminalServices } from "../services/Terminal.services";


export const fetchAllTerminal = createAsyncThunk(
      "terminal/fetchTerminal",
      async (request: any) => {
            try {
                  const { data } = await TerminalServices.getAllTerminal(request);
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