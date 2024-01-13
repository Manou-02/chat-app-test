import { Http } from "@/features/http/repository/http";
import { TransporterConstant } from "../constants";


export class TransporterServices {
      static getAllTransporter = async (params: any) => {
            try {
                  return await Http.get(TransporterConstant.TRANSPORTER, params);
            } catch (error) {
                  return error;
            }
      }

      static createTransporter = async (data: any) => {
            try {
                  return await Http.post(TransporterConstant.TRANSPORTER, data);
            } catch (error) {
                  return error;
            }
      }

      static updateTransporter = async (data: any) => {
            try {
                  return await Http.patch(TransporterConstant.TRANSPORTER, data);
            } catch (error) {
                  return error;
            }
      }
}