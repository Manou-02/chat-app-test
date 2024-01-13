import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReservationService } from "../services/Reservation.services";


export const fetchAllReservation = createAsyncThunk(
      "reservation/fetchAll",
      async (request: any) => {
            try {
                  const { data } = await ReservationService.getAllService(request);
                  return data;

            } catch (error: any) {
                  return {
                        data: { data: [] as any[], total: 0, skip: 0, limit: 0 },
                        page: 1,
                        isLoading: false,
                        error: error.message || "erreur de serveur",
                        limit: 5,
                  };
            }
      }
)