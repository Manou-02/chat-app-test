import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";




export const useCentersData = () => useAppSelector((state: RootState) => state?.centersReducers?.response?.data || []);
export const useCentersIsLoading = () => useAppSelector((state: RootState) => state?.centersReducers?.isLoading);
export const useCentersRequest = () => useAppSelector((state: RootState) => state?.centersReducers?.request);
export const useCentersPagination = () => useAppSelector((state: RootState) => state?.centersReducers?.response?.pagination);