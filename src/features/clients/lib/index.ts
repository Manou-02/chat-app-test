
import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";


export const useClientsData = () => useAppSelector((state: RootState) => state?.clientsReducers?.response?.data || []);
export const useClientsIsLoading = () => useAppSelector((state: RootState) => state?.clientsReducers?.isLoading);
export const useClientsPagination = () => useAppSelector((state: RootState) => state?.clientsReducers?.response?.pagination);
export const useClientsRequests = () => useAppSelector((state: RootState) => state?.clientsReducers?.request);
