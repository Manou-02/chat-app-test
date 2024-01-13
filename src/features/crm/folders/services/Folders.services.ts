import { Http } from "@/features/http/repository/http";
import { FoldersEndPoint } from "../constants/Constants";
import { FoldersCreateInput } from "@/entities/crm/folders/FoldersCreateInput";
import { FoldersUpdateInput } from "@/entities/crm/folders/FoldersUpdateInput";

export class FoldersServices {
    static getAllFolders = async (params?: any) => {
        try {
            const res = await Http.get(FoldersEndPoint.FOLDERS, params);
            return res;
        } catch (error) {
            return error;
        }
    }
    static getOneFolders = async (id: number) => {
        try {
            const res = await Http.get(`${FoldersEndPoint.FOLDERS}/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
    static createFolders = async (data: FoldersCreateInput) => {
        try {
            const res = await Http.post(FoldersEndPoint.FOLDERS, data);
            return res;
        } catch (error) {
            return error;
        }
    }

    static updateFolders = async (data: FoldersUpdateInput) => {
        try {
            return await Http.patch(FoldersEndPoint.FOLDERS, data);
        } catch (error) {
            return error;
        }
    }
}