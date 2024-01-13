import { Loader } from "@/shared/ui/loader/Loader"
import { FormAverageCosts } from "../form/formAverageCosts/FormAverageCosts"
import { useEffect, useState } from "react";
import { AppDispatch, useDispatch } from "@/app/appStore";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { AverageCostsServices } from "@/features/setting/averageCosts/services/AverageCosts.services";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";

type PropsType = {
    onSuccess: () => void;
    selected: any;
}

export const EditAverageCosts = ({
    selected,
    onSuccess
}: PropsType) => {
    const [averageCost, setAverageCost] = useState<any>();

    useEffect(() => {
        setAverageCost({ ...selected });
    }, [selected])

    const dispatch: AppDispatch = useDispatch();
    const [isLoading
        // , setIsLoading
    ] = useState<boolean>(false);

    const handleSubmit = async (finalData: any, handleReset: () => void) => {
        const { data, status } = await AverageCostsServices.updateAverageCosts(
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
            <FormAverageCosts
                selected={averageCost as any}
                handleSubmit={(e, handleReset) => handleSubmit(e, handleReset)} />
        </>
    )
}