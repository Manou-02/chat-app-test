import { Http } from "@/features/http/repository/http";
import { GetOutConstants } from "../constants/Constants";


export class GetOutService {
      static getAllGetOut = async (params: any) => {
            try {
                  return await Http.get(GetOutConstants.GETOUT, params);
            } catch (error) {
                  return error;
            }
      }


      static createGetOut = async (data: any) => {
            try {
                  return await Http.post(GetOutConstants.GETOUT, data);
            } catch (error) {
                  return error;
            }
      }

      static getAllContainer = async (params: any) => {
            try {
                  return await Http.get(GetOutConstants.CONTAINER, params);
            } catch (error) {
                  return error;
            }
      }
}