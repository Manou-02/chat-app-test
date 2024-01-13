import { Http } from "@/features/http/repository/http"
import { CountryConstant } from "../constants"


export class CountryService {
      static getAllCountries = async (params: any) => {
            try {
                  return await Http.get(CountryConstant.COUNTRY, params);
            } catch (error) {
                  return error
            }
      }
}