import { Toast } from "@/shared/components/toast/ToastHelper";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Loader } from "@/shared/ui/loader/Loader";
import dayjs from "dayjs";
import { useState } from "react";
import { FormReservation } from "../formReservation";
import { Booking } from "../formReservation/FormReservation";
import { ReservationService } from "@/features/parcsContainers/reservations/services/Reservation.services";
import { HttpStatus } from "@/shared/config/Status";
import { AppDispatch, useDispatch } from "@/app/appStore";

type PropsType = {
  onSuccess: () => void;
  selected: any;
};

const defaultState: Booking = {
  client: {
    refCustomer: ""
  },
  containers: [
    {
      containerNumber: "",
      dateToGetOut: ""
    }
  ],
  shippingCompany: {
    id: 0,
    name: ""
  }
};


export const AddFormReservations = ({
  onSuccess,
  // selected reservationRequest
}: PropsType) => {
  const dispatch: AppDispatch = useDispatch();

  const [initialState, setInitialState] = useState<any>(defaultState);

  const [isLoading
    // , setIsLoading
  ] = useState<boolean>(false);
  const [
    ,
    setIsLoadingAdd] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
  };



  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    console.log("addedContainers", e)
    try {
      setIsLoadingAdd(true);
      const containers = e?.map((container: any) => {
        return {
          id: container?.containerNumber?.value,
          dateToGetOut: dayjs(container?.dateToGetOut).format("YYYY-MM-DD")
        }
      })
      const finalData = {
        ...initialState,
        ...{ containers },
        isCancelled: false,
        cancelledReason: null,
        client: initialState?.client?.value
          ? `/customers/${initialState?.client?.value}`
          : null,
        dateRelease: dayjs(initialState?.dateRelease).format("YYYY-MM-DD"),
        shippingCompany: `/shipping_companies/${initialState?.shippingCompany?.value}`,
      };
      const { data, status } = await ReservationService.createReservation(
        finalData
      );
      if (status === HttpStatus.CREATED) {
        Toast.success("Ajouter avec succès.");
        dispatch(ActionReducer.setShowDrawer(false));
        setInitialState(defaultState);
        onSuccess();
      } else {
        Toast.error(
          data?.status?.message ||
          "Une erreur s'est produite, veuillez réessayer plus tard."
        );
      }
    }
    catch (error) {
      Toast.error("Une erreur s'est produite, veuillez réessayer plus tard.");
    } finally {
      setIsLoadingAdd(false);
    }
  };
  return (
    <>
      <Loader isLoading={isLoading} />
      <FormReservation
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </>
  );
};
