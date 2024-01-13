import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";


export const useTransporterData = () => useAppSelector((state: RootState) => state?.transportersReducers?.response?.data || []);
export const useTransporterIsLoading = () => useAppSelector((state: RootState) => state?.transportersReducers?.isLoading);
export const useTransporterRequest = () => useAppSelector((state: RootState) => state?.transportersReducers?.request);
export const useTransporterPagination = () => useAppSelector((state: RootState) => state?.transportersReducers?.response?.pagination);