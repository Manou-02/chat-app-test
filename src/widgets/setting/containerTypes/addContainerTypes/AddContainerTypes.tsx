import { Loader } from "@/shared/ui/loader/Loader";
import { FormContainerTypes } from "../form/formContainerTypes";
import { useState } from "react";
import { AppDispatch, useDispatch } from "@/app/appStore";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { ContainerTypesServices } from "@/features/setting/containerTypes/services/ContainerTypes.services";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";


type PropsType = {
    onSuccess: () => void;
}

export const AddContainerTypes = ({ onSuccess }: PropsType) => {
    const dispatch: AppDispatch = useDispatch();

    const [isLoading
        // , setIsLoading
    ] = useState<boolean>(false);

    const handleSubmit = async (finalData: any, handleReset: () => void) => {
        const { data, status } = await ContainerTypesServices.createContainerTypes(
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
            <FormContainerTypes
                handleSubmit={
                    (e, handleReset) => handleSubmit(e, handleReset)
                }
            />
        </>
    );
}