import { Loader } from "@/shared/ui/loader/Loader";
import { FormReservation } from "../formReservation"
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ReservationService } from "@/features/parcsContainers/reservations/services/Reservation.services";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { AppDispatch, useDispatch } from "@/app/appStore";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
// import { ReservationService } from "@/features/parcsContainers/reservations/services/Reservation.services";

type PropsType = {
    onSuccess: () => void;
    selected?: any;
};

export const EditFormReservations = ({ selected,
    onSuccess
}: PropsType) => {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading
        // , setIsLoading
    ] = useState<boolean>(false);
    // initial data to update
    const [booking, setBooking] = useState<any>();
    useEffect(() => {
        setBooking({ ...selected, isCancelled: false });
    }, [selected])

    const handleSubmit = async (e: any) => {
        console.log("Handle submit allData", booking);
        const containers = e?.map((container: any) => {
            return {
                id: container?.containerNumber?.value,
                dateToGetOut: dayjs(container?.dateToGetOut).format("YYYY-MM-DD")
            }
        });
        const finalData = {
            ...booking,
            ...{ containers },
            client: booking?.client?.id
                ? `/customers/${booking?.client?.id}`
                : null,
            dateRelease: dayjs(booking?.dateRelease).format("YYYY-MM-DD"),
            shippingCompany: `/shipping_companies/${booking?.shippingCompany?.id}`,
        }
        const { data, status } = await ReservationService.updateReservation(
            finalData
        );
        if (status === HttpStatus.OK) {
            Toast.success("Modification avec succès.");
            dispatch(ActionReducer.setShowDrawer(false));
            setBooking({});
            onSuccess();
        } else {
            Toast.error(
                data?.status?.message ||
                "Une erreur s'est produite, veuillez réessayer plus tard."
            );
        }
    };

    const handleChange = (e: any) => {
        console.log("Cancel reason ", e);
        setBooking((prev: any) => ({ ...prev, ...e }))
        // shippingCompany
        if (e?.shippingCompany) {
            setBooking((prev: any) => ({
                ...prev, ...{
                    shippingCompany: {
                        name: e?.shippingCompany?.label,
                        id: e?.shippingCompany.value
                    }
                }
            }));
        }
        if (e?.isCancelled === false) {
            setBooking((prev: any) => ({
                ...prev, ...{ cancelledReason: null }
            }))
        }
    }

    return (
        <>
            <Loader isLoading={isLoading} />
            <FormReservation
                booking={booking as any}
                handleChange={handleChange}
                handleSubmit={handleSubmit} />
        </>
    )
}