import { useAppSelector } from "@/app/hooks/app.hooks";
import { RootState } from "@/app/appStore";

export const useGetOutData = () => useAppSelector((state: RootState) => state?.getOutReducers?.response?.data || []);
export const useGetOutLoading = () => useAppSelector((state: RootState) => state?.getOutReducers?.isLoading);
export const useGetOutPagination = () => useAppSelector((state: RootState) => state?.getOutReducers?.response?.pagination);
export const useGetOutRequest = () => useAppSelector((state: RootState) => state?.getOutReducers?.request);
export const useGetOutContainerRequest = () => useAppSelector((state: RootState) => state?.getOutReducers?.requestReserved);