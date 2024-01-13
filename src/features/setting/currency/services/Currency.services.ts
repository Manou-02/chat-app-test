import { Http } from "@/features/http/repository/http";
import { CurrencyConstants } from "../constants";

export class CurrencyServices {
      static getAllCurrencies = async (params: any) => {
            try {
                  return await Http.get(CurrencyConstants.CURRENCY, params);
            } catch (error) {
                  return error;
            }
      }

      static createCurrencies = async (data: any) => {
            try {

                  return await Http.post(CurrencyConstants.CURRENCY, data);
            } catch (error) {
                  return error;
            }
      }

      static updateCurrencies = async (data: any) => {
            try {

                  return await Http.patch(CurrencyConstants.CURRENCY, data);
            } catch (error) {
                  return error;
            }
      }
}