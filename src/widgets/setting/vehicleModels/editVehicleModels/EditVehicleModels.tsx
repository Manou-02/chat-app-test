import { AppDispatch } from "@/app/appStore";
import { Loader } from "@/shared/ui/loader/Loader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormVehicleModels } from "../form/formVehicleModels";
import { VehicleModelsServices } from "@/features/flotte/vehicleModels/services/VehicleModels.services";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { HttpStatus } from "@/shared/config/Status";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";

type PropsType = {
    onSuccess: () => void;
    selected: any;
}

export const EditVehicleModels = ({
    onSuccess,
    selected
}: PropsType) => {
    const dispatch: AppDispatch = useDispatch();

    const [isLoading
        // , setIsLoading
    ] = useState<boolean>(false);

    const handleSubmit = async (finalData: any, handleReset: () => void) => {
        const dataUpdateInput = { ...finalData, ...{ vehicleBrand: `/vehicle_brands/${finalData?.vehicleBrand}` } }
        const { data, status } = await VehicleModelsServices.updateVehicleModels(
            dataUpdateInput
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
            <FormVehicleModels
                selected={selected}
                handleSubmit={
                    (e, handleReset) => handleSubmit(e, handleReset)
                }
            />
        </>
    )
}