import { AppDispatch, useDispatch } from "@/app/appStore";
import { useEffect, useState } from "react";
import { FormContainerTypes } from "../form/formContainerTypes";
import { Loader } from "@/shared/ui/loader/Loader";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { ContainerTypesServices } from "@/features/setting/containerTypes/services/ContainerTypes.services";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";

type PropsType = {
    onSuccess: () => void;
    selected: any;
}
export const EditContainerTypes = ({
    selected,
    onSuccess
}: PropsType) => {
    const [containerType, setContainerType] = useState<any>();

    useEffect(() => {
        setContainerType({ ...selected });
    }, [selected])

    console.log("CONTAINER TYPE ", containerType);


    const dispatch: AppDispatch = useDispatch();
    const [isLoading
        // , setIsLoading
    ] = useState<boolean>(false);

    const handleSubmit = async (finalData: any, handleReset: () => void) => {
        // console.log("dataSubmitted ", finalData);
        // onSuccess();
        // dispatch(ActionReducer.setShowDrawer(false));


        const { data, status } = await ContainerTypesServices.updateContainerTypes(
            finalData
        );
        if (status === HttpStatus.OK) {
            Toast.success("Modification avec succès.");
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
                selected={containerType as any}
                handleSubmit={handleSubmit} />
        </>
    )
}