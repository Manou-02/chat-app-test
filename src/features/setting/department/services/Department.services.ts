import { Http } from "@/features/http/repository/http";
import { DepartmentConstant } from "../constants";


export class DepartmentService {

      static getAllDepartment = async (params: any) => {
            try {
                  return await Http.get(DepartmentConstant.DEPARTMENT, params);
            } catch (error) {
                  return error;
            }
      }

      static createDepartment = async (data: any) => {
            try {
                  return await Http.post(DepartmentConstant.DEPARTMENT, data);
            } catch (error) {
                  return error;
            }
      }

      static updateDepartment = async (data: any) => {
            try {
                  return await Http.patch(DepartmentConstant.DEPARTMENT, data);
            } catch (error) {
                  return error;
            }
      }

}