
import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useReservationData = () => useAppSelector((state: RootState) => state?.resercationReducers?.response?.data || []);
export const useReservationLoading = () => useAppSelector((state: RootState) => state?.resercationReducers?.isLoading);
export const useReservationPagination = () => useAppSelector((state: RootState) => state?.resercationReducers?.response?.pagination);
export const useReservationRequests = () => useAppSelector((state: RootState) => state?.resercationReducers?.request);
