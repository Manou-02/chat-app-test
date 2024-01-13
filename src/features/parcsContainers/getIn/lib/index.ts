import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useGetInData = () => useAppSelector((state: RootState) => state?.getInReducer?.response?.data || []);
export const useGetInLoading = () => useAppSelector((state: RootState) => state.getInReducer?.isLoading);
export const useGetInPagination = () => useAppSelector((state: RootState) => state?.getInReducer?.response?.pagination);
export const useGetInRequest = () => useAppSelector((state: RootState) => state?.getInReducer?.request);