import { Http } from "@/features/http/repository/http";
import { CustomerTypeConstants } from "../constants";


export class CustomerTypeServices {
      static getAllCustomerType = async (params?: any) => {
            try {
                  return await Http.get(CustomerTypeConstants.CUSTOMER_TYPE, params);
            } catch (error) {
                  return error;
            }
      }

      static createCustomerType = async (data: any) => {
            try {
                  return await Http.post(CustomerTypeConstants.CUSTOMER_TYPE, data);
            } catch (error) {
                  return error;
            }
      }

      static updateCustomerType = async (data: any) => {
            try {
                  return await Http.patch(CustomerTypeConstants.CUSTOMER_TYPE, data);
            } catch (error) {
                  return error;
            }
      }

}