import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useOtherCostData = () => useAppSelector((state: RootState) => state?.otherCostReducers?.response?.data || []);
export const useOtherCostPagination = () => useAppSelector((state: RootState) => state?.otherCostReducers?.response?.pagination);
export const useOtherCostIsLoading = () => useAppSelector((state: RootState) => state?.otherCostReducers?.isLoading);
export const useOtherCostRequest = () => useAppSelector((state: RootState) => state?.otherCostReducers?.request);