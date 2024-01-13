import { AppDispatch } from "@/app/appStore";
import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "antd";
import { FormCustom } from "@/shared/ui/form/Form";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Button } from "@/shared/ui/button/Button";
import Spinner from "@/shared/ui/spinner/Spinner";
import { HttpStatus } from "@/shared/config/Status";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { QualityService } from "@/features/setting/quality/services/QualityServices";

type PropsType = {
  selected: any;
  handleSuccess: () => void;
};

export const QualityForm: FC<PropsType> = ({ handleSuccess, selected }) => {
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
        const { data, status } = await QualityService.createQuality(values);
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
        const { data, status } = await QualityService.updateQuality(
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
            label="Libellé"
            name="label"
            required
            value={initialState["label"]}
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
