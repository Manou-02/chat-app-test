import { Http } from "@/features/http/repository/http";
import { OtherCostConstants } from "../constants";

export class OtherCostServices {
      static getAllOtherCosts = async (params: any) => {
            try {
                  return await Http.get(OtherCostConstants.OTHER_COST, params);
            } catch (error) {
                  return error;
            }
      }

      static createOtherCosts = async (data: any) => {
            try {
                  return await Http.post(OtherCostConstants.OTHER_COST, data);
            } catch (error) {
                  return error;
            }
      }

      static updateOtherCosts = async (data: any) => {
            try {
                  return await Http.patch(OtherCostConstants.OTHER_COST, data);
            } catch (error) {
                  return error;
            }
      }

      static getAllAverageCosts = async (params: any) => {
            try {
                  return await Http.get(OtherCostConstants.AVERAGE_COST, params);
            } catch (error) {
                  return error;
            }
      }

}