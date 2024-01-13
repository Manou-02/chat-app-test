import { useEffect, useState } from "react";
import { FormGetOut } from "..";
import { Loader } from "@/shared/ui/loader/Loader";
import { GetOutService } from "@/features/parcsContainers/getOut/services/GetOut.services";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { AppDispatch, useDispatch } from "@/app/appStore";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";

type PropsType = {
    onSuccess: () => void;
};

export const AddFormGetout = ({
    onSuccess
}: PropsType) => {
    const dispatch: AppDispatch = useDispatch();
    const [getOut, setGetOut] = useState<any>({});
    const getOutInit = {};
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(false);
    }, [])

    const handleChange = (e: any) => {

        if (e?.target?.name === "isBL") {
            setGetOut((prev: any) => ({
                ...prev,
                ...{
                    isDeliveryNoteSend: e?.target?.value, isInvoiceSend: !e?.target?.value
                }
            }));
        }
        else {
            setGetOut((prev: any) => ({ ...prev, ...e }));
        }
    }

    const handleSubmit = async (data?: any) => {
        // console.log("data ", data);
        const finalData = {
            ...getOut,
            carrier: `/transporters/${getOut?.carrier?.id}`,
            containers: data?.containers?.map((container: any) => (`/containers/${container?.value}`)),
            customer: data?.customer
        }
        console.log(finalData);
        const { data: dataResponse, status } = await GetOutService.createGetOut(
            finalData
        );
        if (status === HttpStatus.CREATED) {
            Toast.success("Ajouter avec succès.");
            dispatch(ActionReducer.setShowDrawer(false));
            setGetOut(getOutInit);
            onSuccess();
        } else {
            Toast.error(
                dataResponse?.status?.message ||
                "Une erreur s'est produite, veuillez réessayer plus tard."
            );
        }
    }
    return (
        <>
            <Loader isLoading={isLoading} />
            <FormGetOut
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />
        </>
    )
}