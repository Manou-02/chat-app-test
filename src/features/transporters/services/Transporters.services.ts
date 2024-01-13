import { Http } from "@/features/http/repository/http";
import { TranportersEndPoint } from "../constants/Constants";

export class TransportersServices {
    static getAllTransporters = async (params?: any) => {
        try {
            const res = await Http.get(TranportersEndPoint.TRANPORTERS, params);
            return res;
        } catch (error) {
            return error;
        }
    }
}