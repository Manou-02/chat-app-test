import { AppDispatch } from "@/app/appStore";
import { Loader } from "@/shared/ui/loader/Loader";
import { Steps } from "@/widgets/components/steps/Steps";
import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStore } from "react-redux";
import { IdentificationBank } from "./components/IdentificationBank";
import { ContactBank } from "./components/ContactBank";
import {
  resetBanksFormData,
  setBanksFormData,
} from "@/features/setting/bank/reducers/BanksForm.reducers";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { BanksServices } from "@/features/setting/bank/services/BankServices";
import { HttpStatus } from "@/shared/config/Status";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";

type PropsType = {
  onSuccess: () => void;
};

export const BanksForm: FC<PropsType> = ({ onSuccess }) => {
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
        setBanksFormData({
          ...finalSelected,
          interlocutor: {
            label: finalSelected?.interlocutor?.name,
            value: finalSelected?.interlocutor?.id,
          },
          country: {
            label: finalSelected?.country?.nameFr,
            value: finalSelected?.country?.id,
          },
          bankContacts: finalSelected?.bankContacts?.map((item: any) => ({
            ...item,
            country: {
              label: item?.country?.nameFr,
              value: item?.country?.id,
            },
          })),
        })
      );
    }
  }, [finalSelected]);

  useEffect(() => {
    return () => {
      dispatch(resetBanksFormData());
    };
  }, []);

  const handleLoading = () => {
    setIsLoading((prev: boolean) => !prev);
  };

  const handleNext = () => {
    setCurrent((prev: number) => (prev += 1));
  };

  const handlePrev = () => {
    setCurrent((prev: number) => (prev -= 1));
  };

  const handleFinish = async () => {
    const finalData = (store.getState() as any)?.banksFormReducer?.state;
    try {
      handleLoading();
      console.log(">>>>>>>", finalData);

      const dataToPost = {
        ...finalData,
        interlocutor: finalData?.interlocutor
          ? `/users/${finalData?.interlocutor?.value}`
          : null,
        country: finalData?.country
          ? `/countries/${finalData?.country?.value}`
          : null,
        bankContacts: finalData?.bankContacts?.map((item: any) => ({
          ...item,
          civility: item?.civility ? item?.civility?.value : "",
          country: item?.country ? `/countries/${item?.country?.value}` : null,
        })),
      };

      if (!dataToPost?.id) {
        const { status, data } = await BanksServices.createBank(dataToPost);
        if (status === HttpStatus.CREATED) {
          Toast.success("Ajout effectué avec succès");
          onSuccess();
          dispatch(ActionReducer.setShowDrawer(false));
        } else {
          Toast.error(
            data?.data?.message ||
              "Une erreur s'est produite, veuillez réessayer plus tard."
          );
        }
      } else {
        const { status, data } = await BanksServices.updateBank(dataToPost);
        if (status === HttpStatus.OK) {
          Toast.success("Modification effectué avec succès");
          onSuccess();
          dispatch(ActionReducer.setShowDrawer(false));
        } else {
          Toast.error(
            data?.data?.message ||
              "Une erreur s'est produite, veuillez réessayer plus tard."
          );
        }
      }

      console.log(dataToPost);
    } catch (error) {
      console.log(error);
      Toast.error("Une erreur s'est produite, veuillez réessayer plus tard.");
    } finally {
      handleLoading();
    }
  };

  const [data] = useState<any>([
    {
      key: 0,
      title: "Identification",
      content: (
        <IdentificationBank
          handleNext={handleNext}
          // data={finalSelected ? finalSelected?.customerIdentification : null}
        />
      ),
    },
    {
      key: 1,
      title: "Contact",
      content: (
        <ContactBank
          handlePrev={handlePrev}
          handleFinish={handleFinish}
          // data={finalSelected ? finalSelected?.customerContact : null}
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
