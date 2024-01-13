import { createAsyncThunk } from "@reduxjs/toolkit";
import { ClientsServices } from "../services/Clients.services";


export const fetchAllClients = createAsyncThunk(
      "clients/fetchCliensts",
      async (request: any) => {
            try {
                  const { data } = await ClientsServices.getAllClients(request);
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