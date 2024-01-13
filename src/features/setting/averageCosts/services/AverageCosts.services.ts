import { Http } from "@/features/http/repository/http";
import { AverageCostsEndPoint } from "../constants/Constants";
import { AverageCostsCreateInput } from "@/entities/setting/averageCosts/AverageCostsCreateInput";

export class AverageCostsServices {
    static getAllAverageCosts = async (params?: any) => {
        try {
            const res = await Http.get(AverageCostsEndPoint.AVERAGE_COSTS, params);
            return res;
        } catch (error) {
            return error;
        }
    }
    static getOneAverageCosts = async (id: number) => {
        try {
            const res = await Http.get(`${AverageCostsEndPoint.AVERAGE_COSTS}/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
    static createAverageCosts = async (data: AverageCostsCreateInput) => {
        try {
            const res = await Http.post(AverageCostsEndPoint.AVERAGE_COSTS, data);
            return res;
        } catch (error) {
            return error;
        }
    }

    static updateAverageCosts = async (data: any) => {
        try {
            return await Http.patch(AverageCostsEndPoint.AVERAGE_COSTS, data);
        } catch (error) {
            return error;
        }
    }
}