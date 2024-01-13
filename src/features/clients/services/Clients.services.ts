import { Http } from "@/features/http/repository/http";
import { ClientsConstants } from "../constants/Constants";

export class ClientsServices {

      static getAllClients = async (params: any) => {
            try {
                  return await Http.get(ClientsConstants.CLIENTS, params);
            } catch (error) {
                  return error;
            }
      }

      static getAllCustomerType = async (params?: any) => {
            try {
                  return await Http.get(ClientsConstants.CUSTOMERS_TYPES, params);
            } catch (error) {
                  return error;

            }
      }

      static createCustomer = async (data: any) => {
            try {
                  return await Http.post(ClientsConstants.CLIENTS, data);
            } catch (error) {
                  return error;
            }
      }

      static updateCustomer = async (data: any) => {
            try {
                  return await Http.patch(ClientsConstants.CLIENTS, data)
            } catch (error) {
                  return error;
            }
      }
}