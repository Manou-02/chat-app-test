import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useCustomerTypesData = () => useAppSelector((state: RootState) => state?.CustomerTypesReducers?.response?.data || []);
export const useCustomerTypesIsLoading = () => useAppSelector((state: RootState) => state?.CustomerTypesReducers?.isLoading);
export const useCustomerTypesPagination = () => useAppSelector((state: RootState) => state?.CustomerTypesReducers?.response?.pagination);
// export const useCustomerTypesRequests = (state: RootState) => useAppSelector(() => {
//       console.log('st', state);
//       return state?.CustomerTypesReducers?.request
// });

export const useCustomerTypesRequests = () => useAppSelector((state: RootState) => state?.CustomerTypesReducers?.request)