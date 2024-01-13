import { AppDispatch, store } from "@/app/appStore";
import { setTransactionForm } from "@/features/crm/transactions/reducers/TransactionForm.reducers";
import { TransactionServices } from "@/features/crm/transactions/services/Transactions.services";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { HttpStatus } from "@/shared/config/Status";
import { Button } from "@/shared/ui/button/Button";
import { FormCustom } from "@/shared/ui/form/Form";
import { Loader } from "@/shared/ui/loader/Loader";
import Select from "@/shared/ui/select/Select";
import { Form } from "antd";
import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

type PropsType = {
  onNext: () => void;
};

export const FolderForm: FC<PropsType> = ({ onNext }) => {
  const dispatch: AppDispatch = useDispatch();

  const [form] = Form.useForm();
  const [initialState, setInitialState] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allFolderList, setAllFolderList] = useState<Array<any>>([]);

  const allStateForm = (store?.getState() as any)?.transactionFormReducer
    ?.transactionForm;

  useEffect(() => {
    getAllFolder();
  }, []);

  useEffect(() => {
    setInitialState({
      ...allStateForm,
      folder: allStateForm?.folder?.id
        ? {
            label: allStateForm?.folder?.name,
            value: allStateForm?.folder?.id,
          }
        : null,
    });
  }, [allStateForm]);

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [initialState]);

  const getAllFolder = async () => {
    try {
      setIsLoading(true);

      const { status, data } = await TransactionServices.getAllFolders({});
      if (status === HttpStatus.OK) {
        setAllFolderList(data?.data || []);
      } else {
        Toast.error(
          data?.status?.message ||
            "Une erreur s'est produite, veuillez réessayer plus tard."
        );
      }
    } catch (error) {
      console.log(error);
      Toast.error("Une erreur s'est produite, veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
    const data = allFolderList?.find(
      (item: any) => item?.id === (Object.values(e)[0] as any)?.value
    );
    dispatch(setTransactionForm({ ...initialState, folder: data }));
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    try {
      onNext();
    } catch (error) {
      console.log(error);
    }
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
              label="Nom du dossier"
              name="folder"
              required
              placeholder="-- Sélectionner --"
              value={initialState["folder"]}
              options={allFolderList?.map((item: any) => ({
                label: item?.name,
                value: item.id,
              }))}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Button typeButton="secondary-rounded" isTypeSubmit>
            Suivant
          </Button>
        </div>
      </FormCustom>
    </>
  );
};
