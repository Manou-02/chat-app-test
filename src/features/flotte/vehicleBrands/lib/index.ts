import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useVehicleBrandsData = () => useAppSelector((state: RootState) => state?.vehicleBrandsReducers?.response?.data || []);
export const useVehicleBrandsIsLoading = () => useAppSelector((state: RootState) => state?.vehicleBrandsReducers?.isLoading);
export const useVehicleBrandsPagination = () => useAppSelector((state: RootState) => state?.vehicleBrandsReducers?.response?.pagination);
export const useVehicleBrandsRequests = () => useAppSelector((state: RootState) => state?.vehicleBrandsReducers?.request || {
    page: 1,
    itemsPerPage: 10
});