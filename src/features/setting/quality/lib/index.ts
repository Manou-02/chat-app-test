import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";


export const useQualityData = () => useAppSelector((state: RootState) => state?.qualityReducers?.response?.data);
export const useQualityLoading = () => useAppSelector((state: RootState) => state?.qualityReducers?.isLoading);
export const useQualityPagination = () => useAppSelector((state: RootState) => state?.qualityReducers?.response?.pagination);
export const useQualityRequest = () => useAppSelector((state: RootState) => state?.qualityReducers?.request);