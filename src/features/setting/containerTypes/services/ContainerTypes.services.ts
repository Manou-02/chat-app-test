import { Http } from "@/features/http/repository/http";
import { ContainerTypesEndPoint } from "../constants/Constants";
import { ContainerTypesCreateInput } from "@/entities/setting/containerTypes/ContainerTypesCreateInput";

export class ContainerTypesServices {
    static getAllContainerTypes = async (params?: any) => {
        try {
            const res = await Http.get(ContainerTypesEndPoint.CONTAINER_TYPES, params);
            return res;
        } catch (error) {
            return error;
        }
    }
    static getOneContainerTypes = async (id: number) => {
        try {
            const res = await Http.get(`${ContainerTypesEndPoint.CONTAINER_TYPES}/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
    static createContainerTypes = async (data: ContainerTypesCreateInput) => {
        try {
            const res = await Http.post(ContainerTypesEndPoint.CONTAINER_TYPES, data);
            return res;
        } catch (error) {
            return error;
        }
    }

    static updateContainerTypes = async (data: any) => {
        try {
            return await Http.patch(ContainerTypesEndPoint.CONTAINER_TYPES, data);
        } catch (error) {
            return error;
        }
    }
}