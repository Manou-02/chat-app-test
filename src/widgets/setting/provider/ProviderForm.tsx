import { AppDispatch } from "@/app/appStore";
import { ProviderService } from "@/features/setting/provider/services/Provider.services";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { HttpStatus } from "@/shared/config/Status";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Button } from "@/shared/ui/button/Button";
import { FormCustom } from "@/shared/ui/form/Form";
import Spinner from "@/shared/ui/spinner/Spinner";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Form } from "antd";
import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

type PropsType = {
  selected: any;
  handleSuccess: () => void;
};

export const ProviderForm: FC<PropsType> = ({ handleSuccess, selected }) => {
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();

  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<any>({});

  useEffect(() => {
    setInitialState({ ...selected });
  }, [selected]);

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [initialState]);

  const handleLoading = () => {
    setIsLoadingSubmit((prev: any) => !prev);
  };

  const handleChange = (e: any) => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
  };

  const handleSubmit = async (values: any) => {
    try {
      handleLoading();

      if (!initialState?.id) {
        const { data, status } = await ProviderService.createProvider(values);
        if (status === HttpStatus.CREATED) {
          Toast.success("Ajouter avec succès.");
          dispatch(ActionReducer.setShowDrawer(false));
          handleSuccess();
        } else {
          Toast.error(
            data?.status?.message ||
              "Une erreur s'est produite, veuillez réessayer plus tard."
          );
        }
      } else {
        const { data, status } = await ProviderService.updateProvider(
          initialState
        );
        if (status === HttpStatus.OK) {
          Toast.success("Modification effectué succès.");
          dispatch(ActionReducer.setShowDrawer(false));
          handleSuccess();
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
    <FormCustom
      form={form}
      className={"my-[50px] flex flex-col gap-[20px]"}
      onSubmit={handleSubmit}
    >
      <div className="flex gap-[20px] items-center">
        <div className="w-[30%] pt-[10px]">
          <TextInput
            label="Nom"
            name="name"
            required
            value={initialState["name"]}
            // value={form.getFieldValue("name")}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-[10px]">
        <Button isTypeSubmit>
          {isLoadingSubmit ? <Spinner /> : "Valider"}
        </Button>
      </div>
    </FormCustom>
  );
};
