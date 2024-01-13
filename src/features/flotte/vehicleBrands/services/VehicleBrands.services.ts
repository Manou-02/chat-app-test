import { Http } from "@/features/http/repository/http";
import { VehicleBrandsEndPoint } from "../constants/Contants";
import { VehicleBrandsCreateInput } from "@/entities/setting/vehicleBrands/VehicleBrandsCreateInput";
import { VehicleBrandsUpdateInput } from "@/entities/setting/vehicleBrands/VehicleBrandsUpdateInput";

export class VehicleBrandsServices {
    static getAllVehicleBrand = async (params?: any) => {
        try {
            const res = await Http.get(VehicleBrandsEndPoint.VEHICLE_BRANDS, params);
            return res;
        } catch (error) {
            return error;
        }
    }

    static createVehicleBrands = async (data: VehicleBrandsCreateInput) => {
        try {
            const res = await Http.post(VehicleBrandsEndPoint.VEHICLE_BRANDS, data);
            return res;
        } catch (error) {
            return error;
        }
    }

    static updateVehicleBrands = async (data: VehicleBrandsUpdateInput) => {
        try {
            return await Http.patch(VehicleBrandsEndPoint.VEHICLE_BRANDS, data);
        } catch (error) {
            return error;
        }
    }
}