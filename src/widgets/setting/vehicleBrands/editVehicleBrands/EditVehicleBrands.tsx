import { AppDispatch } from "@/app/appStore";
import { Loader } from "@/shared/ui/loader/Loader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormVehicleBrands } from "../form/formVehicleBrands";
import { VehicleBrandsServices } from "@/features/flotte/vehicleBrands/services/VehicleBrands.services";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";

type PropsType = {
    onSuccess: () => void;
    selected: any;
}

export const EditVehicleBrands = ({ onSuccess, selected }: PropsType) => {
    const dispatch: AppDispatch = useDispatch();

    const [isLoading
        // , setIsLoading
    ] = useState<boolean>(false);

    const handleSubmit = async (finalData: any, handleReset: () => void) => {
        const { data, status } = await VehicleBrandsServices.updateVehicleBrands(
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
            <FormVehicleBrands
                selected={selected}
                handleSubmit={
                    (e, handleReset) => handleSubmit(e, handleReset)
                }
            />
        </>
    )
}