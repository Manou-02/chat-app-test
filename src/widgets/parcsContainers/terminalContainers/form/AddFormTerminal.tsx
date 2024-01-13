import { AppDispatch } from "@/app/appStore";
import { TerminalServices } from "@/features/parcsContainers/terminalContainer/services/Terminal.services";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { HttpStatus } from "@/shared/config/Status";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Button } from "@/shared/ui/button/Button";
import { InputNumber } from "@/shared/ui/inputNumber/InputNumber";
import Select from "@/shared/ui/select/Select";
import Spinner from "@/shared/ui/spinner/Spinner";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "antd";
import { Loader } from "@/shared/ui/loader/Loader";
import { FormCustom } from "@/shared/ui/form/Form";

type PropsType = {
  selected: any;
  onSuccess: () => void;
};

const defaultState = {};

export const AddFormTerminal = ({ onSuccess, selected }: PropsType) => {
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [allCenters, setAllCenters] = useState<Array<any>>([]);
  const [initialState, setInitialState] = useState<any>(defaultState);

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [initialState]);

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    getAllCenters();
    if (selected) {
      setInitialState({
        ...selected,
        center: { label: selected?.center?.name, value: selected?.center?.id },
      });
    } else {
      form.setFieldsValue(defaultState);
    }
  }, [selected]);

  const handleChange = (e: any) => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
  };

  const onLoadingHandler = () => {
    setIsLoadingSubmit((prev: boolean) => !prev);
  };

  const getAllCenters = async () => {
    try {
      setIsLoading(true);
      const { status, data } = await TerminalServices.getAllCenters();
      if (status === HttpStatus.OK) {
        setAllCenters(data?.data);
      } else {
        Toast.error("Une erreur s'est produite,veuillez réessayer plus tard.");
      }
    } catch (error) {
      Toast.error("Une erreur s'est produite,veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   onLoadingHandler();

  //   const dataToSend = {
  //     ...initialState,
  //     center: initialState?.center?.value
  //       ? `/centers/${initialState?.center?.value}`
  //       : null,
  //   };

  //   try {
  //     onLoadingHandler();
  //     setIsLoading(true);
  //     if (!selected) {
  //       const { status, data } = await TerminalServices.createTerminal(
  //         dataToSend
  //       );
  //       if (status === HttpStatus.CREATED) {
  //         Toast.success("Ajouter avec succès.");
  //         onSuccess();
  //         dispatch(ActionReducer.setShowDrawer(false));
  //         setInitialState(defaultState);
  //       } else {
  //         Toast.error(
  //           data?.status?.message ||
  //             "Une erreur s'est produite, veuillez réessayer plus tard."
  //         );
  //       }
  //     } else {
  //       const { status, data } = await TerminalServices.updateTerminal(
  //         dataToSend
  //       );

  //       if (status === HttpStatus.OK) {
  //         Toast.success("Modification effectué avec succès.");
  //         onSuccess();
  //         dispatch(ActionReducer.setShowDrawer(false));
  //         setInitialState(defaultState);
  //       } else {
  //         Toast.error(
  //           data?.status?.message ||
  //             "Une erreur s'est produite, veuillez réessayer plus tard."
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     Toast.error("Une erreur s'est produite,veuillez réessayer plus tard.");
  //   } finally {
  //     setIsLoading(false);
  //   }

  //   console.log(initialState);
  // };

  const handleFinish = async (values: any) => {
    console.log(selected);

    const dataToSend = {
      ...values,
      center: values?.center?.value
        ? `/centers/${values?.center?.value}`
        : null,
    };
    console.log("Data to send\n", dataToSend);

    try {
      onLoadingHandler();
      if (!selected?.id) {
        const { status, data } = await TerminalServices.createTerminal(
          dataToSend
        );
        if (status === HttpStatus.CREATED) {
          Toast.success("Ajouter avec succès.");
          onSuccess();
          dispatch(ActionReducer.setShowDrawer(false));
          setInitialState(defaultState);
        } else {
          Toast.error(
            data?.status?.message ||
              "Une erreur s'est produite, veuillez réessayer plus tard."
          );
        }
      } else {
        const { status, data } = await TerminalServices.updateTerminal({
          id: selected?.id,
          ...dataToSend,
        });

        if (status === HttpStatus.OK) {
          Toast.success("Modification effectué avec succès.");
          onSuccess();
          dispatch(ActionReducer.setShowDrawer(false));
          setInitialState(defaultState);
        } else {
          Toast.error(
            data?.status?.message ||
              "Une erreur s'est produite, veuillez réessayer plus tard."
          );
        }
      }
    } catch (error) {
      console.log(error);

      Toast.error("Une erreur s'est produite,veuillez réessayer plus tard.");
    } finally {
      onLoadingHandler();
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <FormCustom
        form={form}
        onSubmit={handleFinish}
        className={"my-[50px] flex flex-col gap-[20px]"}
      >
        <div className="flex gap-[20px] items-center">
          <div className="w-[30%]">
            <Select
              label="Centres"
              name="center"
              placeholder="-- Sélectionner un type --"
              required
              // value={form.getFieldValue("center")}
              value={initialState["center"]}
              options={allCenters?.map((item: any) => ({
                label: item.name,
                value: item.id,
              }))}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%] pt-[10px]">
            <TextInput
              label="Terminal"
              name="name"
              required
              value={initialState["name"]}
              // value={form.getFieldValue("name")}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%] pt-[10px]">
            <InputNumber
              label="Capacité(20 pieds)"
              name="capacity"
              required
              value={initialState["capacity"]}
              // value={form.getFieldValue("capacity")}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* footer form  */}
        <div className="flex justify-end gap-[10px]">
          <Button isTypeSubmit>
            {isLoadingSubmit ? <Spinner /> : "Valider"}
          </Button>
        </div>
      </FormCustom>
    </>
    // <form
    //   onSubmit={handleSubmit}
    //   className="my-[50px] flex flex-col gap-[20px]"
    // >
    //   <div className="flex gap-[20px] items-center">
    //     <div className="w-[30%]">
    //       <Select
    //         name="center"
    //         label="Centres"
    //         placeholder="-- Sélectionner un type --"
    //         value={initialState["center"]}
    //         options={allCenters?.map((item: any) => ({
    //           label: item.name,
    //           value: item.id,
    //         }))}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="w-[30%] pt-[10px]">
    //       <TextInput
    //         label="Terminal"
    //         name="name"
    //         value={initialState["name"]}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="w-[30%] pt-[10px]">
    //       <InputNumber
    //         label="Capacité(20 pieds)"
    //         name="capacity"
    //         value={initialState["capacity"]}
    //         onChange={handleChange}
    //       />
    //       {/* <TextInput
    //         label="Capacité(20 pieds)"
    //         name="capacity"
    //         value={initialState["capacity"]}
    //         onChange={handleChange}
    //       /> */}
    //     </div>
    //   </div>
    //   {/* footer form  */}
    //   <div className="flex justify-end gap-[10px]">
    //     <Button onClick={handleSubmit}>
    //       {isLoading ? <Spinner /> : "Valider"}
    //     </Button>
    //   </div>
    // </form>
  );
};
