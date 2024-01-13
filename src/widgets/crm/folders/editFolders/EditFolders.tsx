import { Loader } from "@/shared/ui/loader/Loader";
import { useEffect, useState } from "react";
import { FormFolders } from "../form/formFolders";
import { FoldersServices } from "@/features/crm/folders/services/Folders.services";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { AppDispatch, useDispatch } from "@/app/appStore";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";

type PropsType = {
  onSuccess: () => void;
  selected: any;
};

export const EditFolders = ({ selected, onSuccess }: PropsType) => {
  const dispatch: AppDispatch = useDispatch();
  const [, setFolder] = useState<any>();
  const [
    isLoading,
    // , setIsLoading
  ] = useState<boolean>(false);

  const handleSubmit = async (finalData: any, handleReset: () => void) => {
    console.log("handleSubmit ", finalData);
    const updateInputData = {
      ...finalData,
      ...{
        beginDate: finalData?.beginDate?.format("YYYY-MM-DD"),
        deliverydate: finalData?.deliverydate?.format("YYYY-MM-DD"),
        customer: `/customers/${finalData?.customer?.value}`,
        projectHolder: `/users/${finalData?.projectHolder?.id}`,
        priority: finalData?.priority?.value || finalData?.priority,
      },
    };
    const { data, status } = await FoldersServices.updateFolders(
      updateInputData
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

    // handleReset();
    // onSuccess();
  };

  useEffect(() => {
    setFolder({
      id: selected?.id,
      beginDate: selected?.beginDate,
      deliverydate: selected?.deliverydate,
      customer: { id: selected?.id },
      name: selected?.name,
      priority: selected?.priority,
      projectHolder: { id: selected?.projectHolder?.id },
      comment: selected?.comment,
    });
  }, [selected]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <FormFolders
        handleSubmit={(e, handleReset) => handleSubmit(e, handleReset)}
      />
    </>
  );
};
