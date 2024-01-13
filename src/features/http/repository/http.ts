import { store } from "@/app/appStore";
import { setUserProfileData } from "@/features/auth/reducers/Auth.reducers";
import { AuthServices } from "@/features/auth/services/Auth.services";
import { HttpStatus } from "@/shared/config/Status";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.timeout = import.meta.env.VITE_MAX_TIMEOUT || 40000;
axios.interceptors.request.use((config) => {
      if (store.getState()?.profileUser?.token) {
            config.headers.Authorization = `Bearer ${store.getState()?.profileUser?.token}`;
      }
      return config;
});

axios.interceptors.response.use(
      (response) => response,
      async (error) => {
            const originalRequest = error.config;
            const refreshToken = store?.getState()?.profileUser?.refresh_token;
            if (
                  error?.response?.status === HttpStatus.UNAUTHORIZES &&
                  !originalRequest._retry &&
                  refreshToken
            ) {
                  store.dispatch(setUserProfileData({ ...store?.getState()?.profileUser, token: undefined }))
                  originalRequest._retry = true;
                  try {
                        if (refreshToken) {

                              const response = await AuthServices.refreshToken(refreshToken);
                              if (response?.status === HttpStatus.OK) {
                                    store.dispatch(setUserProfileData(response?.data))
                              }
                              return axios(originalRequest);
                        } else {
                              return;
                        }
                  } catch (error) {
                        store.dispatch(setUserProfileData(null))
                  }
            }
            return Promise.reject(error);
      }
);

/**
 * @end AXIOS Interceptors
 */


export class Http {
      static setBaseUrl(url: string) {
            axios.defaults.baseURL = url;
      }

      /**
       * Get lists
       * @param url 
       * @param params 
       * @returns 
       */
      static async get(url: string, params?: any): Promise<any> {
            try {
                  const res = await axios.get(url, { params });
                  return res;

            } catch (e) {
                  const error = e as AxiosError;
                  throw error.response;
            }
      }

      static async getOne(url: string, params?: any): Promise<any> {
            try {
                  const res = await axios.get(`${url}/${params}`);
                  return res;
            } catch (e) {
                  const error = e as AxiosError;
                  throw error.response;
            }
      }


      /**
       * @start Methods Post
       * @param url 
       * @param params params data to sent 
       * @returns 
       */
      static async post(
            url: string,
            _data?: any,
            option?: any
      ): Promise<any> {
            try {
                  const { data, status } = await axios.post(url, _data, option);
                  return { data, status };
            } catch (e) {
                  const error = e as AxiosError;
                  throw error.response;
            }
      }

      /**
       * @start Methods Put
       * @param url 
       * @param params
       * @returns 
       */
      static async put(url: string, params: AxiosRequestConfig<any>): Promise<any> {
            try {
                  const res = await axios.put(url, params);
                  return res;
            } catch (e) {
                  const error = e as AxiosError;
                  throw error.response;
            }
      }

      /**
       * @start Methods patch
       * @param url 
       * @param params 
       * @returns 
       */
      static async patch(url: string, params: any): Promise<any> {
            const { id, ...rest } = params;
            try {
                  const res = await axios.patch(`${url}/${id}`, rest);
                  return res;
            } catch (e) {
                  const error = e as AxiosError;
                  throw error.response;
            }
      }

      /**
       * @start Delete
       * @param url 
       * @param id 
       * @returns 
       */
      static async delete(url: string, id?: any): Promise<any> {
            try {
                  const data = await axios.delete(`${url}/${id}`);
                  return data;
            } catch (e) {
                  const error = e as AxiosError;
                  return error.response;
            }
      }

}