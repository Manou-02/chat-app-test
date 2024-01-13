import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerTypeServices } from "../services/CustomerType.services";


export const fetchAllCustomerType = createAsyncThunk(
      "customerType/getAllCustomerType",
      async (params: any) => {
            try {

                  const { data } = await CustomerTypeServices.getAllCustomerType(params);
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