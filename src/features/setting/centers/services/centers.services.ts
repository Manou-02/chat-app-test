import { Http } from "@/features/http/repository/http";
import { CenterContants } from "../contants";


export class CentersService {

      static getAllCennters = async (params: any) => {
            try {
                  return await Http.get(CenterContants.CENTERS, params);
            } catch (error) {
                  return error;
            }
      }

      static createCenters = async (data: any) => {
            try {
                  return await Http.post(CenterContants.CENTERS, data);
            } catch (error) {
                  return error;
            }
      }

      static updateCenters = async (data: any) => {
            try {
                  return await Http.patch(CenterContants.CENTERS, data);
            } catch (error) {
                  return error;
            }
      }

}