import { Loader } from "@/shared/ui/loader/Loader";
import { FormFolders } from "../form/formFolders";
import { useState } from "react";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { AppDispatch, store, useDispatch } from "@/app/appStore";
import { FoldersServices } from "@/features/crm/folders/services/Folders.services";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";

type PropsType = {
  onSuccess: () => void;
};

export const AddFolders = ({ onSuccess }: PropsType) => {
  const dispatch: AppDispatch = useDispatch();

  const [finalSelected] = useState<any>(
    (store.getState() as any)?.tableReducer?.selected
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoading = () => {
    setIsLoading((prev: boolean) => !prev);
  };

  const handleSubmit = async (finalData: any, handleReset: () => void) => {
    const createInputData = {
      ...finalData,
      ...{
        beginDate: finalData?.beginDate?.format("YYYY-MM-DD"),
        deliverydate: finalData?.deliverydate?.format("YYYY-MM-DD"),
        customer: `/customers/${finalData?.customer?.value}`,
        projectHolder: `/users/${finalData?.projectHolder?.value}`,
        priority: finalData?.priority?.value,
      },
    };

    try {
      handleLoading();
      if (!finalSelected) {
        const { data, status } = await FoldersServices.createFolders(
          createInputData
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
      } else {
        delete createInputData?.folderTransactions;
        const { data, status } = await FoldersServices.updateFolders(
          createInputData
        );

        if (status === HttpStatus.OK) {
          Toast.success("Modification effectué avec succès.");
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
    } catch (error) {
      console.log(error);

      Toast.error("Une erreur s'est produite, veuillez réessayer plus tard.");
    } finally {
      handleLoading();
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <FormFolders
        handleSubmit={(e, handleReset) => handleSubmit(e, handleReset)}
      />
    </>
  );
};
