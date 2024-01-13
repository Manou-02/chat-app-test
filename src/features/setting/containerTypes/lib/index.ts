import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useContainerTypesData = () => useAppSelector((state: RootState) => state?.containerTypesReducers?.response?.data || []);
export const useContainerTypesIsLoading = () => useAppSelector((state: RootState) => state?.containerTypesReducers?.isLoading);
export const useContainerTypesPagination = () => useAppSelector((state: RootState) => state?.containerTypesReducers?.response?.pagination);
export const useContainerTypesRequests = () => useAppSelector((state: RootState) => state?.containerTypesReducers?.request || {
    page: 1,
    itemsPerPage: 10
});