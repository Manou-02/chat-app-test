import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";


export const useTransactionData = () => useAppSelector((state: RootState) => state?.transactionReducers?.response?.data || []);
export const useTransactionPagination = () => useAppSelector((state: RootState) => state?.transactionReducers?.response?.pagination);
export const useTransactionIsLoading = () => useAppSelector((state: RootState) => state?.transactionReducers?.isLoading);
export const useTransactionRequest = () => useAppSelector((state: RootState) => state?.transactionReducers?.request);