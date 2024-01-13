import { Http } from "@/features/http/repository/http";
import { RerservationConstants } from "../constants/Constants";


export class ReservationService {

      static getAllService = async (params: any) => {
            try {
                  return await Http.get(RerservationConstants.RESERVATION, params);
            } catch (error) {
                  return error;
            }
      }

      static createReservation = async (data: any) => {
            try {
                  return await Http.post(RerservationConstants.RESERVATION, data);
            } catch (error) {
                  return error;
            }
      }

      static updateReservation = async (data: any) => {
            try {
                  return await Http.patch(RerservationConstants.RESERVATION, data);
            } catch (error) {
                  return error;
            }
      }

      static getAllContiners = async (params?: any) => {
            try {
                  return await Http.get(RerservationConstants.CONTAINERS, params);
            } catch (error) {
                  return error;
            }
      }

      static getOneGetIn = async (id: number) => {
            try {
                  return await Http.get(`${RerservationConstants.CONTAINERS}/${id}`);
            } catch (error) {
                  return error;
            }
      }

}