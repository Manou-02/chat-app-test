import { Steps } from "@/widgets/components/steps/Steps";
import { useState, FC, useEffect } from "react";
import { Identification } from "@/widgets/clients/components/Identification";
import { Banks } from "@/widgets/clients/components/Bank";
import { Contact } from "@/widgets/clients/components/Contact";
import { FreeField } from "@/widgets/clients/components/FreeField";
import { useStore } from "react-redux";
import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";
import { Loader } from "@/shared/ui/loader/Loader";
import {
  resetCreateUserForm,
  setCreateUserForm,
} from "@/features/users/reducers/CreateUser.reducer";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { HttpStatus } from "@/shared/config/Status";
import { ClientsServices } from "@/features/clients/services/Clients.services";

type PropsType = {
  onSuccess: () => void;
  selected?: any;
};

export const AddClientsForm: FC<PropsType> = ({ onSuccess }) => {
  const store = useStore();
  const dispatch: AppDispatch = useDispatch();

  const [current, setCurrent] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [finalSelected] = useState<any>(
    (store.getState() as any)?.tableReducer?.selected
  );

  useEffect(() => {
    if (finalSelected) {
      dispatch(
        setCreateUserForm({
          ...finalSelected,
          customerIdentification: {
            ...finalSelected.customerIdentification,
            interlocutor: {
              label: finalSelected.customerIdentification?.interlocutor?.name,
              value: finalSelected.customerIdentification?.interlocutor?.id,
            },
            customerType: {
              label: finalSelected.customerIdentification?.customerType?.label,
              value: finalSelected.customerIdentification?.customerType?.id,
            },
            quality: {
              label: finalSelected.customerIdentification?.quality?.label,
              value: finalSelected.customerIdentification?.quality?.id,
            },
            country: {
              label: finalSelected.customerIdentification?.country?.nameFr,
              value: finalSelected.customerIdentification?.country?.id,
            },
            province: {
              label: finalSelected.customerIdentification?.province?.label,
              value: finalSelected.customerIdentification?.province?.id,
            },
          },
          customerContact: finalSelected.customerContact?.map((item: any) => ({
            ...item,
            qualite: {
              label: item?.qualite?.label,
              value: item?.qualite?.id,
            },
          })),
          customerBank: {
            ...finalSelected.customerBank,
            titledBank: {
              label: finalSelected.customerBank?.titledBank?.entitled,
              value: finalSelected.customerBank?.titledBank?.id,
            },
            currency: {
              label: finalSelected.customerBank?.currency?.reference,
              value: finalSelected.customerBank?.currency?.id,
            },
          },
        })
      );
    } else {
      dispatch(resetCreateUserForm());
    }
  }, [finalSelected]);

  useEffect(() => {
    return () => {
      dispatch(resetCreateUserForm());
    };
  }, []);

  const handleNext = () => {
    setCurrent((prev: number) => (prev += 1));
  };

  const handlePrev = () => {
    setCurrent((prev: number) => (prev -= 1));
  };

  const handleFinish = async () => {
    const allFieldData = (store.getState() as any)?.createUserReducer
      ?.formState;

    try {
      setIsLoading(true);
      const dataToPost = {
        ...allFieldData,
        customerIdentification: {
          ...allFieldData?.customerIdentification,
          interlocutor: allFieldData?.customerIdentification?.interlocutor
            ? `/users/${allFieldData?.customerIdentification?.interlocutor?.value}`
            : null,
          quality: allFieldData?.customerIdentification?.quality
            ? `/qualities/${allFieldData?.customerIdentification?.quality?.value}`
            : null,
          customerType: allFieldData?.customerIdentification?.customerType
            ? `/customer_types/${allFieldData?.customerIdentification?.customerType?.value}`
            : null,
          country: allFieldData?.customerIdentification?.country
            ? `/countries/${allFieldData?.customerIdentification?.country?.value}`
            : null,
          province: allFieldData?.customerIdentification?.province
            ? `/provinces/${allFieldData?.customerIdentification?.province?.value}`
            : null,
        },
        customerContact: allFieldData?.customerContact?.map((item: any) => ({
          ...item,
          qualite: item?.qualite?.value
            ? `/qualities/${item?.qualite?.value}`
            : null,
        })),
        customerBank: {
          ...allFieldData?.customerBank,
          titledBank: allFieldData?.customerBank?.titledBank
            ? `/banks/${allFieldData?.customerBank?.titledBank?.value}`
            : null,
          currency: allFieldData?.customerBank?.currency
            ? `/currencies/${allFieldData?.customerBank?.currency.value}`
            : null,
        },
      };
      console.log("dataToPost ",dataToPost);
      
      if (!allFieldData?.id) {
        const { status, data } = await ClientsServices.createCustomer(
          dataToPost
        );
        if (status === HttpStatus.CREATED) {
          Toast.success("Ajouter avec succès.");
          onSuccess();
          dispatch(ActionReducer.setShowDrawer(false));
          dispatch(resetCreateUserForm());
        } else {
          Toast.error(
            data?.status?.message ||
            "Une erreur s'est produite, veuillez réessayer plus tard."
          );
        }
      } else {
        const { status, data } = await ClientsServices.updateCustomer(
          dataToPost
        );
        if (status === HttpStatus.CREATED || status === HttpStatus.OK) {
          Toast.success("Modification effectué avec succès.");
          onSuccess();
          dispatch(ActionReducer.setShowDrawer(false));
          dispatch(resetCreateUserForm());
        } else {
          Toast.error(
            data?.status?.message ||
            "Une erreur s'est produite, veuillez réessayer plus tard."
          );
        }
      }
      // dispatch(resetCreateUserForm());
    } catch (error) {
      console.log(error);

      Toast.error("Une erreur s'est produite, veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  const [data] = useState<any>([
    {
      key: 0,
      title: "Identification",
      content: (
        <Identification
          handleNext={handleNext}
        // data={finalSelected ? finalSelected?.customerIdentification : null}
        />
      ),
    },
    {
      key: 1,
      title: "Contact",
      content: (
        <Contact
          handleNext={handleNext}
          handlePrev={handlePrev}
        // data={finalSelected ? finalSelected?.customerContact : null}
        />
      ),
    },
    {
      key: 2,
      title: "Banques",
      content: (
        <Banks
          handleNext={handleNext}
          handlePrev={handlePrev}
        // data={finalSelected ? finalSelected?.customerBank : null}
        />
      ),
    },
    {
      key: 3,
      title: "Champs libre",
      content: (
        <FreeField
          handlePrev={handlePrev}
          handleFinish={handleFinish}
        // data={finalSelected ? finalSelected?.customerFreeField : null}
        />
      ),
    },
  ]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Steps activeKey={current} data={data} />
    </>
  );
};
