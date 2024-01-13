import { Http } from "@/features/http/repository/http"
import { QualityConstants } from "../constants"

export class QualityService {
      static getAllQaulity = async (params: any) => {
            try {
                  return await Http.get(QualityConstants.QUALITY, params);
            } catch (error) {
                  return error
            }
      }

      static createQuality = async (data: any) => {
            try {
                  return await Http.post(QualityConstants.QUALITY, data)
            } catch (error) {
                  return error;
            }
      }

      static updateQuality = async (data: any) => {
            try {
                  return await Http.patch(QualityConstants.QUALITY, data);
            } catch (error) {
                  return error;
            }
      }
}