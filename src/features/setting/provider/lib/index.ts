import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";



export const useProviderData = () => useAppSelector((state: RootState) => state?.providerReducers?.response?.data || []);
export const useProviderRequest = () => useAppSelector((state: RootState) => state?.providerReducers?.request);
export const useProviderPagination = () => useAppSelector((state: RootState) => state?.providerReducers?.response?.pagination);
export const useProviderIsLoading = () => useAppSelector((state: RootState) => state?.providerReducers?.isLoading);