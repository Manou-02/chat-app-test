import { Http } from "@/features/http/repository/http";
import { Terminal } from "../constants/Constants";


export class TerminalServices {
      static getAllTerminal = async (params?: any) => {
            try {
                  return await Http.get(Terminal.TERMINAL, params)
            } catch (error) {
                  return error;
            }
      }

      static createTerminal = async (data: any) => {
            try {
                  return await Http.post(Terminal.TERMINAL, data);
            } catch (error) {
                  return error;
            }
      }

      static updateTerminal = async (data: any) => {
            try {
                  return await Http.patch(Terminal.TERMINAL, data);

            } catch (error) {
                  return error;
            }
      }

      static getAllCenters = async (params?: any) => {
            try {
                  return await Http.get(Terminal.CENTER, params);
            } catch (error) {
                  return error;
            }
      }

      static getTotal = async () => {
            try {
                  return await Http.get(Terminal.TOTAL);
            } catch (error) {
                  return error;
            }
      }
}