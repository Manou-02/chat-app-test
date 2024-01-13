import { AppDispatch, useDispatch } from "@/app/appStore";
import { useState } from "react";
import { FormShippingCompanies } from "../form/formShippingCompanies/FormShippingCompanies";
import { Loader } from "@/shared/ui/loader/Loader";
import { ShippingCompaniesServices } from "@/features/setting/shippingCompanies/services/ShippingCompanies.services";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";

type PropsType = {
    onSuccess: () => void;
}

export const AddShippingCompanies = ({ onSuccess }: PropsType) => {
    const dispatch: AppDispatch = useDispatch();

    const [isLoading
        // , setIsLoading
    ] = useState<boolean>(false);

    const handleSubmit = async (finalData: any, handleReset: () => void) => {
        const { data, status } = await ShippingCompaniesServices.createShippingCompanies(
            finalData
        );
        if (status === HttpStatus.CREATED) {
            Toast.success("Ajouter avec succès.");
            dispatch(ActionReducer.setShowDrawer(false));
            handleReset();
            onSuccess();
        } else {
            Toast.error(
                data?.status?.message ||
                "Une erreur s'est produite, veuillez réessayer plus tard."
            );
        }
    }
    return (
        <>
            <Loader isLoading={isLoading} />
            <FormShippingCompanies
                handleSubmit={
                    (e, handleReset) => handleSubmit(e, handleReset)
                }
            />
        </>
    )
}