import { Http } from "@/features/http/repository/http";
import { ShippingCompaniesEndPoint } from "../constants/Contants";
import { ShippingCompaniesCreateInput } from "@/entities/setting/shippingCompanies/ShippingCompaniesCreateInput";
import { ShippingCompaniesUpdateInput } from "@/entities/setting/shippingCompanies/ShippingCompaniesUpdateInput";

export class ShippingCompaniesServices {
    static getAllShippingCompanies = async (params?: any) => {
        try {
            const res = await Http.get(ShippingCompaniesEndPoint.SHIPPING_COMPANIES, params);
            return res;
        } catch (error) {
            return error;
        }
    }

    static createShippingCompanies = async (data: ShippingCompaniesCreateInput) => {
        try {
            const res = await Http.post(ShippingCompaniesEndPoint.SHIPPING_COMPANIES, data);
            return res;
        } catch (error) {
            return error;
        }
    }

    static updateShippingCompanies = async (data: ShippingCompaniesUpdateInput) => {
        try {
            return await Http.patch(ShippingCompaniesEndPoint.SHIPPING_COMPANIES, data);
        } catch (error) {
            return error;
        }
    }
}