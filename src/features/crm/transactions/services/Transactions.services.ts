import { Http } from "@/features/http/repository/http";
import { TransactionsConstants } from "../constants";

export class TransactionServices {
      static getAllTransactions = async (params: any) => {
            try {
                  return await Http.get(TransactionsConstants.TRANSACTIONS_LIST, params);
            } catch (error) {
                  return error;
            }
      }

      static getAllFolders = async (params: any) => {
            try {
                  return await Http.get(TransactionsConstants.FOLDER, params);
            } catch (error) {
                  return error;
            }
      }

      static getOneFolder = async (id: number) => {
            try {
                  return await Http.getOne(TransactionsConstants.FOLDER, id);
            } catch (error) {
                  return error;
            }
      }


      static createTransactions = async (data: any) => {
            try {
                  return await Http.post(TransactionsConstants.TRANSACTIONS, data);
            } catch (error) {
                  return error;
            }
      }

      static updateTransactions = async (data: any) => {
            try {
                  return await Http.patch(TransactionsConstants.TRANSACTIONS, data);
            } catch (error) {
                  return error;
            }
      }
}