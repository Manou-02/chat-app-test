import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersServices } from "../services/Users.services";

export const fetchAllUsers = createAsyncThunk(
      "users/fetchAllUsers",
      async (request?: any) => {
            try {
                  const res = await UsersServices.getAllUsers(request);

                  return res?.data;
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