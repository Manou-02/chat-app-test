import { Http } from "@/features/http/repository/http";
import { ProvinceConstant } from "../constants";


export class ProvinceServices {
      static getAllProvinces = async (params: any) => {
            try {
                  return await Http.get(ProvinceConstant.PROVINCE, params);
            } catch (error) {
                  return error;
            }
      }
}