import { createAsyncThunk } from "@reduxjs/toolkit";
import { DepartmentService } from "../services/Department.services";


export const fetchAllDepartment = createAsyncThunk(
      "department/fetchAllDepartment",
      async (params: any) => {
            try {
                  const { data } = await DepartmentService.getAllDepartment(params)
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