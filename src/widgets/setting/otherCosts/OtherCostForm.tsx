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
import { OtherCostServices } from "@/features/setting/otherCost/services/OtherCost.services";
import Select from "@/shared/ui/select/Select";
import { InputNumber } from "@/shared/ui/inputNumber/InputNumber";
import { Loader } from "@/shared/ui/loader/Loader";

type PropsType = {
  selected: any;
  handleSuccess: () => void;
};

type AverageType = {
  id: number;
  name: string;
  cost: number;
};

export const OtherCostForm: FC<PropsType> = ({ handleSuccess, selected }) => {
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<any>({});
  const [allAverageData, setAllAverageData] = useState<any>([]);

  useEffect(() => {
    getAllAverageData();
  }, []);

  useEffect(() => {
    setInitialState({
      ...selected,
      averageCost: {
        label: `${selected?.averageCost?.name} (${selected?.averageCost?.cost}) `,
        value: selected?.averageCost?.id,
      },
    });
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

  const getAllAverageData = async () => {
    try {
      setIsLoading(true);

      const { status, data } = await OtherCostServices.getAllAverageCosts({});
      if (status === HttpStatus.OK) {
        if (data?.data) {
          setAllAverageData(
            data?.data?.map((item: AverageType) => ({
              label: `${item.name} (${item.cost})`,
              value: item.id,
            }))
          );
        } else {
          setAllAverageData([]);
        }
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

  const handleSubmit = async () => {
    const dataToPost = {
      ...initialState,
      averageCost: initialState.averageCost?.value
        ? `/average_costs/${initialState.averageCost?.value}`
        : null,
    };
    console.log(dataToPost);

    try {
      handleLoading();

      if (!initialState?.id) {
        const { data, status } = await OtherCostServices.createOtherCosts(
          dataToPost
        );
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
        const { data, status } = await OtherCostServices.updateOtherCosts(
          dataToPost
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
    <>
      <Loader isLoading={isLoading} />
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
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%] pt-[10px]">
            <Select
              label="Coût moyen"
              name="averageCost"
              required
              value={initialState["averageCost"]}
              placeholder="-- Sélectionner --"
              options={allAverageData}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%] pt-[10px]">
            <InputNumber
              label="Prix de revente"
              name="resalePrice"
              required
              value={initialState["resalePrice"]}
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
    </>
  );
};
