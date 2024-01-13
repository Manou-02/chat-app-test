import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useVehicleModelsData = () => useAppSelector((state: RootState) => state?.vehicleModelsReducers?.response?.data || []);
export const useVehicleModelsIsLoading = () => useAppSelector((state: RootState) => state?.vehicleModelsReducers?.isLoading);
export const useVehicleModelsPagination = () => useAppSelector((state: RootState) => state?.vehicleModelsReducers?.response?.pagination);
export const useVehicleModelsRequests = () => useAppSelector((state: RootState) => state?.vehicleModelsReducers?.request || {
    page: 1,
    itemsPerPage: 10
});