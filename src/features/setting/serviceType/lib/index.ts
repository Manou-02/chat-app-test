
import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";



export const useServiceTypeData = () => useAppSelector((state: RootState) => state?.serviceTypeReducer?.response?.data || []);
export const useServiceTypeRequest = () => useAppSelector((state: RootState) => state?.serviceTypeReducer?.request);
export const useServiceTypeIsLoading = () => useAppSelector((state: RootState) => state?.serviceTypeReducer?.isLoading);
export const useServiceTypePagination = () => useAppSelector((state: RootState) => state?.serviceTypeReducer?.response?.pagination);