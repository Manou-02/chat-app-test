import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useTransportersData = () => useAppSelector((state: RootState) => state?.tranportersReducers?.response?.data || []);
export const useTranportersIsLoading = () => useAppSelector((state: RootState) => state?.tranportersReducers?.isLoading);
export const useTransportersPagination = () => useAppSelector((state: RootState) => state?.tranportersReducers?.response?.pagination);
// export const useUsersRequests = (state: RootState) => useAppSelector(() => {
//       console.log('st', state);
//       return state?.usersReducers?.request
// });

export const useTransportersRequests = () => useAppSelector((state: RootState) => state?.tranportersReducers?.request)