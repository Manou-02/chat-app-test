import { AppDispatch, useDispatch } from "@/app/appStore";
import { useState } from "react";
import { FormVehicleModels } from "../form/formVehicleModels";
import { Loader } from "@/shared/ui/loader/Loader";
import { VehicleModelsServices } from "@/features/flotte/vehicleModels/services/VehicleModels.services";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";

type PropsType = {
    onSuccess: () => void;
}

export const AddVehicleModels = ({ onSuccess }: PropsType) => {
    const dispatch: AppDispatch = useDispatch();

    const [isLoading
        // , setIsLoading
    ] = useState<boolean>(false);

    const handleSubmit = async (finalData: any, handleReset: () => void) => {
        const dataVehicleModelInput = { ...finalData, ...{ vehicleBrand: `/vehicle_brands/${finalData?.vehicleBrand}` } }
        const { data, status } = await VehicleModelsServices.createVehicleModels(
            dataVehicleModelInput
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
            <FormVehicleModels
                handleSubmit={
                    (e, handleReset) => handleSubmit(e, handleReset)
                }
            />
        </>
    )
}