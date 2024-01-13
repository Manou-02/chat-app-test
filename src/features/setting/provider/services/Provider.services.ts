import { Http } from "@/features/http/repository/http";
import { ProviderConstants } from "../constants";


export class ProviderService {
      static getAllProvider = async (params: any) => {
            try {
                  return await Http.get(ProviderConstants.PROVIDER, params);
            } catch (error) {
                  return error;
            }
      }

      static createProvider = async (data: any) => {
            try {
                  return await Http.post(ProviderConstants.PROVIDER, data);
            } catch (error) {
                  return error;
            }
      }

      static updateProvider = async (data: any) => {
            try {
                  return await Http.patch(ProviderConstants.PROVIDER, data);
            } catch (error) {
                  return error;
            }
      }
}