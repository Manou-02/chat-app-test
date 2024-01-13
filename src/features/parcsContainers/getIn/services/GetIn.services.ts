import { Http } from "@/features/http/repository/http";
import { GetInConstants } from "../constants/Constants";


export class GetInService {
      static getAllGetIn = async (params: any) => {
            try {
                  return await Http.get(GetInConstants.GETIN, params);
            } catch (error) {
                  return error;
            }
      }

      static createGetIn = async (data: any) => {
            try {
                  return await Http.post(GetInConstants.GETIN, data);
            } catch (error) {
                  return error;
            }
      }

      static getAllTransporter = async (params?: any) => {
            try {
                  return await Http.get(GetInConstants.TRANSPORTER, params);
            } catch (error) {
                  return error;
            }
      }

      static getAllShipingCompanies = async (params?: any) => {
            try {
                  return await Http.get(GetInConstants.SHIPPING_COPANIES, params);
            } catch (error) {
                  return error;
            }
      }


}