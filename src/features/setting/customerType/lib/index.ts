

import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useCustomerTypeData = () => useAppSelector((state: RootState) => state?.customerTypeReducers?.response?.data || []);
export const useCustomerTypeRequest = () => useAppSelector((state: RootState) => state?.customerTypeReducers?.request);
export const useCustomerTypeIsLoading = () => useAppSelector((state: RootState) => state?.customerTypeReducers?.isLoading);
export const useCustomerTypePagination = () => useAppSelector((state: RootState) => state?.customerTypeReducers?.response?.pagination)
