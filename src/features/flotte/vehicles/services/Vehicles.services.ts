import { Http } from "@/features/http/repository/http";
import { VehiclesEndPoint } from "../constants/Constants";
import { VehicleCreateInput } from "@/entities/flotte/VehicleCreateInput";

export class VehiclesServices {
    static getAllVehicles = async (params?: any) => {
        try {
            const res = await Http.get(VehiclesEndPoint.VEHICLES, params);
            return res;
        } catch (error) {
            return error;
        }
    }
    static getOneVehicles = async (id: number) => {
        try {
            const res = await Http.get(`${VehiclesEndPoint.VEHICLES}/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
    static createVehicle = async (data: VehicleCreateInput) => {
        try {
            const res = await Http.post(VehiclesEndPoint.VEHICLES, data);
            return res;
        } catch (error) {
            return error;
        }
    }
}