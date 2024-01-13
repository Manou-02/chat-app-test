import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useCurrencyData = () => useAppSelector((state: RootState) => state?.currencyReducers?.response?.data);
export const useCurrencyLoading = () => useAppSelector((state: RootState) => state?.currencyReducers?.isLoading);
export const useCurrencyPagination = () => useAppSelector((state: RootState) => state?.currencyReducers?.response?.pagination);
export const useCurrencyRequest = () => useAppSelector((state: RootState) => state?.currencyReducers?.request);