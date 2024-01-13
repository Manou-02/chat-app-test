import { Http } from "@/features/http/repository/http";
import { CustomerTypesEndPoint } from "../constants/Constants";

export class CustomerTypesServices {
    static getAllCustomerTypes = async (params?: any) => {
        try {
            const res = await Http.get(CustomerTypesEndPoint.CUSTOMERS_TYPES, params);
            return res;
        } catch (error) {
            return error;
        }
    }
}