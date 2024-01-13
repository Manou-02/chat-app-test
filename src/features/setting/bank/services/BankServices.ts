import { Http } from "@/features/http/repository/http";
import { BankConstant } from "../constants";

export class BanksServices {

      static getAllBanks = async (params: any) => {
            try {
                  return await Http.get(BankConstant.BANK, params);
            } catch (error) {
                  return error;
            }
      }

      static createBank = async (data: any) => {
            try {
                  return await Http.post(BankConstant.BANK, data);
            } catch (error) {
                  return error;
            }
      }

      static updateBank = async (data: any) => {
            try {
                  return await Http.patch(BankConstant.BANK, data);
            } catch (error) {
                  return error;
            }
      }
}