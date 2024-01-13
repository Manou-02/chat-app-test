import { Http } from "@/features/http/repository/http";
import { VehicleModelsEndPoint } from "../constants/Contants";
import { VehicleModelsCreateInput } from "@/entities/setting/vehicleModels/VehicleModelsCreateInput";
import { VehicleModelsUpdateInput } from "@/entities/setting/vehicleModels/VehicleModelsUpdateInput";

export class VehicleModelsServices {
    static getAllVehicleModel = async (params?: any) => {
        try {
            const res = await Http.get(VehicleModelsEndPoint.VEHICLE_MODELS, params);
            return res;
        } catch (error) {
            return error;
        }
    }

    static createVehicleModels = async (data: VehicleModelsCreateInput) => {
        try {
            const res = await Http.post(VehicleModelsEndPoint.VEHICLE_MODELS, data);
            return res;
        } catch (error) {
            return error;
        }
    }

    static updateVehicleModels = async (data: VehicleModelsUpdateInput) => {
        try {
            return await Http.patch(VehicleModelsEndPoint.VEHICLE_MODELS, data);
        } catch (error) {
            return error;
        }
    }
}