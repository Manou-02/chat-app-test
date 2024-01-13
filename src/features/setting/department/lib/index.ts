import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";


export const useDepartmentData = () => useAppSelector((state: RootState) => state?.departmentReducers?.response?.data || []);
export const useDepartmentIsLoading = () => useAppSelector((state: RootState) => state?.departmentReducers?.isLoading);
export const useDepartmentPagination = () => useAppSelector((state: RootState) => state?.departmentReducers?.response?.pagination);
export const useDepartmentRequest = () => useAppSelector((state: RootState) => state?.departmentReducers?.request);