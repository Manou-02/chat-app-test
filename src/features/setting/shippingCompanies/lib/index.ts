import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useShippingCompaniesData = () => useAppSelector((state: RootState) => state?.shippingCompaniesReducers?.response?.data || []);
export const useShippingCompaniesIsLoading = () => useAppSelector((state: RootState) => state?.shippingCompaniesReducers?.isLoading);
export const useShippingCompaniesPagination = () => useAppSelector((state: RootState) => state?.shippingCompaniesReducers?.response?.pagination);
export const useShippingCompaniesRequests = () => useAppSelector((state: RootState) => state?.shippingCompaniesReducers?.request || {
    page: 1,
    itemsPerPage: 10
});