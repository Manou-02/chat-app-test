import { Http } from "@/features/http/repository/http";
import { UsersEndPoint } from "../constants/Constants";


export class UsersServices {
      /**
       * Get details of users
       * @returns 
       */
      static getProfileUsers = async () => {
            try {
                  const res = await Http.get(UsersEndPoint.USER_PROFIL);
                  return res;
            } catch (error) {
                  return error
            }
      }

      /**
       * @Start Get all users
       * @returns 
       */
      static getAllUsers = async (params?: any) => {
            try {
                  const res = await Http.get(UsersEndPoint.USER, params);
                  return res
            } catch (error) {
                  return error;
            }
      }

      /**
       * @start Create users
       * @param data 
       * @returns 
       */
      static createUser = async (data?: any) => {
            try {
                  const res = await Http.post(UsersEndPoint.USER, data);
                  return res;
            } catch (error) {
                  return error;
            }
      }

      static updateUser = async (data: any) => {
            try {
                  const res = await Http.patch(UsersEndPoint.USER, data);
                  return res;
            } catch (error) {
                  return error;
            }
      }

      static deleteUser = async (id: number | string) => {
            try {
                  const res = await Http.delete(UsersEndPoint.USER, id);
                  return res;
            } catch (error) {
                  return error;
            }
      }
}