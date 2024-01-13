import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useAverageCostsData = () => useAppSelector((state: RootState) => state?.averageCostsReducers?.response?.data || []);
export const useAverageCostsIsLoading = () => useAppSelector((state: RootState) => state?.averageCostsReducers?.isLoading);
export const useAverageCostsPagination = () => useAppSelector((state: RootState) => state?.averageCostsReducers?.response?.pagination);
export const useAverageCostsRequests = () => useAppSelector((state: RootState) => state?.averageCostsReducers?.request || {
    page: 1,
    itemsPerPage: 10
});