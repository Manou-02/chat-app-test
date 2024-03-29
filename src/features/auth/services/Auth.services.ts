import { Http } from "@/features/http/repository/http";
import { AuthEndpoint } from "../constants/Constants";


type TypeLogin = {
      username: string;
      password: string;
}

export class AuthServices extends Http {
      static login = async (data: TypeLogin) => {
            try {
                  const res = await Http.post(AuthEndpoint.LOGIN, data);
                  return res;
            } catch (error) {
                  return error;
            }
      }

      static logout = async () => {
            try {
                  const res = await Http.get(AuthEndpoint.LOGOUT);
                  return res;
            } catch (error) {
                  return error;
            }
      }

      static refreshToken = async (refreshToken: string) => {
            try {
                  const res = await Http.post(AuthEndpoint.REFRESH_TOKEN, { refresh_token: refreshToken }, {
                        headers: {
                              Authorization: null
                        }
                  });
                  return res;
            } catch (error) {
                  return error;
            }
      }

}