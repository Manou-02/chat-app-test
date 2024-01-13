import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useVehiclesData = () => useAppSelector((state: RootState) => state?.vehiclesReducers?.response?.data || []);
export const useVehicleData = () => useAppSelector((state: RootState) => state?.vehicleReducers?.response?.data || {});
export const useVehicleIsLoading = () => useAppSelector((state: RootState) => state?.vehicleReducer?.isLoading);
export const useVehiclesIsLoading = () => useAppSelector((state: RootState) => state?.vehiclesReducers?.isLoading);
export const useVehiclesPagination = () => useAppSelector((state: RootState) => state?.vehiclesReducers?.response?.pagination);
export const useVehiclesRequests = () => useAppSelector((state: RootState) => state?.vehiclesReducers?.request || {
    page: 1,
    itemsPerPage: 10
});
export const useVehicleCreated = () => useAppSelector((state: RootState) => state?.vehicleOnCreateReducers?.response?.data[0] || {})