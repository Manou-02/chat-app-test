import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";


export const useBanksData = () => useAppSelector((state: RootState) => state?.banksReducers?.response?.data);
export const useBanksPagination = () => useAppSelector((state: RootState) => state?.banksReducers?.response?.pagination);
export const useBanksRequest = () => useAppSelector((state: RootState) => state?.banksReducers?.request);
export const useBanksLoader = () => useAppSelector((state: RootState) => state?.banksReducers?.isLoading);