import { Button } from "@/shared/ui/button/Button";
import Select from "@/shared/ui/select/Select";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { useState, useEffect, FC } from "react";
import { Form } from "antd";
import { FormCustom } from "@/shared/ui/form/Form";
import { AppDispatch, store } from "@/app/appStore";
import { useDispatch } from "react-redux";
import { setCreateUserForm } from "@/features/users/reducers/CreateUser.reducer";
import { BanksServices } from "@/features/setting/bank/services/BankServices";
import { HttpStatus } from "@/shared/config/Status";
import { Loader } from "@/shared/ui/loader/Loader";
import { CurrencyServices } from "@/features/setting/currency/services/Currency.services";

type PropsType = {
  handleNext: () => void;
  handlePrev: () => void;
};
export const Banks: FC<PropsType> = ({ handlePrev, handleNext }) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();

  const allBankData = (store.getState() as any)?.createUserReducer?.formState
    ?.customerBank;

  const [initialState, setInitialState] = useState<any>({});
  const [allBanks, setAllBanks] = useState<any[]>([]);
  const [allCurrencies, setAllCurrencies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllBanks();
    getAllDevis();
  }, []);

  useEffect(() => {
    setInitialState((prev: any) => ({ ...prev, ...allBankData }));
  }, [allBankData]);

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [initialState]);

  const handleLoading = () => {
    setIsLoading((prev: boolean) => !prev);
  };

  const getAllBanks = async () => {
    try {
      handleLoading();

      const { status, data } = await BanksServices.getAllBanks({});
      if (status === HttpStatus.OK) {
        setAllBanks(
          data?.data?.map((item: any) => ({
            label: item?.entitled,
            value: item?.id,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleLoading();
    }
  };

  const getAllDevis = async () => {
    try {
      handleLoading();

      const { status, data } = await CurrencyServices.getAllCurrencies({});
      if (status === HttpStatus.OK) {
        setAllCurrencies(
          data?.data?.map((item: any) => ({
            label: item?.reference,
            value: item?.id,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleLoading();
    }
  };

  const handleChange = (e: any) => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
    dispatch(setCreateUserForm({ customerBank: { ...initialState, ...e } }));
  };

  const handleSubmit = (values: any) => {
    dispatch(setCreateUserForm({ customerBank: values }));
    handleNext();
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <FormCustom
        form={form}
        onSubmit={handleSubmit}
        className="flex flex-col justify-between"
      >
        <div className="flex gap-[20px] w-full">
          <div className="w-[30%]">
            <Select
              label="Intitulé banque"
              name="titledBank"
              placeholder="-- Sélectionner --"
              value={initialState["titledBank"]}
              options={allBanks}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <TextInput
              label="Banque"
              name="bank"
              value={initialState["bank"]}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <TextInput
              label="Guichet"
              name="ticketOffice"
              value={initialState["ticketOffice"]}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-[20px] w-full">
          <div className="w-[30%]">
            <TextInput
              label="N° de compte"
              name="accountNumber"
              value={initialState["accountNumber"]}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <TextInput
              label="Clé"
              name="keyAccount"
              value={initialState["keyAccount"]}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <Select
              label="Devise"
              name="currency"
              placeholder="-- Sélectionner --"
              value={initialState["currency"]}
              options={allCurrencies}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full flex justify-end gap-[20px] h-[40px]">
          <Button typeButton="secondary-rounded" onClick={handlePrev}>
            Précédent
          </Button>
          <Button typeButton="secondary-rounded" isTypeSubmit>
            Suivant
          </Button>
        </div>
      </FormCustom>
    </>
  );
};
