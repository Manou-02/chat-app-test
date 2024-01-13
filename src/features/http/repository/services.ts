import { Http } from "./http";

export class Service extends Http {

      static getAll(params: any, url: string) {
            return Http.get(url, params)
      }


} 