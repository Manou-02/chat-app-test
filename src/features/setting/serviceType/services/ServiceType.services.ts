import { Http } from "@/features/http/repository/http";
import { ServiceTypeConstant } from "../constants";


export class ServiceTypeService {
      static getAllServiceType = async (params: any) => {
            try {
                  return await Http.get(ServiceTypeConstant.SERVICE_TYPE, params);
            } catch (error) {
                  return error;
            }
      }

      static createServiceType = async (data: any) => {
            try {
                  return await Http.post(ServiceTypeConstant.SERVICE_TYPE, data);
            } catch (error) {
                  return error;
            }
      }

      static updateServiceType = async (data: any) => {
            try {
                  return await Http.patch(ServiceTypeConstant.SERVICE_TYPE, data);
            } catch (error) {
                  return error;
            }
      }
}