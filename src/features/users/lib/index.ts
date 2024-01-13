import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";

export const useUsersData = () => useAppSelector((state: RootState) => state?.usersReducers?.response?.data || []);
export const useUsersIsLoading = () => useAppSelector((state: RootState) => state?.usersReducers?.isLoading);
export const useUsersPagination = () => useAppSelector((state: RootState) => state?.usersReducers?.response?.pagination);
// export const useUsersRequests = (state: RootState) => useAppSelector(() => {
//       console.log('st', state);
//       return state?.usersReducers?.request
// });

export const useUsersRequests = () => useAppSelector((state: RootState) => state?.usersReducers?.request)