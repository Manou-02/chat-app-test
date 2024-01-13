import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";


export const useTerminalData = () => useAppSelector((state: RootState) => state?.terminalReducers?.response?.data || []);
export const useTerminalPagination = () => useAppSelector((state: RootState) => state?.terminalReducers?.response?.pagination);
export const useIsTerminalLoading = () => useAppSelector((state: RootState) => state?.terminalReducers?.isLoading);
export const useTerminalRequest = () => useAppSelector((state: RootState) => state?.terminalReducers?.request);
