import { AppDispatch, store } from "@/app/appStore";
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
import { PasswordInput } from "@/shared/ui/passwordInput/PasswordInput";
import { formatDefaultTime } from "@/shared/utils/formatTime";
import { TimeRange } from "@/shared/ui/timeRange/TimeRange";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { UsersServices } from "@/features/users/services/Users.services";
import Switch from "@/shared/ui/switch/Switch";

type PropsType = {
  handleSuccess: () => void;
};

const initialDefaultTime = {
  start: "",
  end: "",
};
export const UsersForm: FC<PropsType> = ({ handleSuccess }) => {
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const [initialState, setInitialState] = useState<any>({});
  const [defaultTime, setDefaultTime] = useState<any[]>([initialState]);

  const [finalSelected] = useState<any>(
    (store.getState() as any)?.tableReducer?.selected
  );

  useEffect(() => {
    return () => {
      setInitialState({});
      setDefaultTime([initialState]);
    };
  }, []);

  useEffect(() => {
    console.log("selected\n", finalSelected);

    setInitialState({ ...finalSelected });
    if (finalSelected) {
      setDefaultTime(
        finalSelected?.times_range?.length
          ? finalSelected?.times_range
          : [initialState]
      );
    } else {
      setInitialState({});
      setDefaultTime([initialState]);
    }
  }, [finalSelected]);

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [initialState]);

  const handleLoading = () => {
    setIsLoadingSubmit((prev: any) => !prev);
  };

  const onAddTimeHandler = () => {
    setDefaultTime((prev) => [...prev, initialDefaultTime]);
  };

  const onRemoveTimeHandler = (index: number) => {
    setDefaultTime((prev) => prev.filter((_, key) => key !== index));
  };

  const onChangeTime = (e: any, key: number) => {
    if (e) {
      setDefaultTime((prev) =>
        prev.map((item: any, index: number) => {
          if (key !== index) {
            return item;
          } else {
            return {
              ...item,
              ...(Object.values(e)[0] as any)[0],
            };
          }
        })
      );
    }
  };

  const handleChange = (e: any) => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
  };

  const handleSubmit = async (values: any) => {
    //     console.log(values);
    const finalData = {
      ...values,
      isInterlocutor: !values.isInterlocutor ? false : true,
      times_range: defaultTime.filter((item: any) => item?.start && item?.end),
    };

    try {
      handleLoading();
      if (!finalSelected?.id) {
        const { status, data } = await UsersServices.createUser(finalData);
        if (status === HttpStatus.CREATED || status === HttpStatus.OK) {
          handleSuccess();
          dispatch(ActionReducer.setShowDrawer(false));
          Toast.success("Ajouté avec succès");

          return;
        } else {
          Toast.error(
            data?.status?.messageDetail ||
              "Une erreur s'est produite, veuillez réessayer plus tard."
          );
        }
      } else {
        const { status, data } = await UsersServices.updateUser({
          ...finalData,
          id: finalSelected?.id,
        });
        if (status === HttpStatus.CREATED || status === HttpStatus.OK) {
          handleSuccess();
          dispatch(ActionReducer.setShowDrawer(false));
          Toast.success("Modification effectué avec succès");
        } else {
          Toast.error(
            data?.status?.messageDetail ||
              "Une erreur s'est produite, veuillez réessayer plus tard."
          );
        }
      }
    } catch (error) {
      console.log(error);
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
      <div className="flex gap-[20px] w-full">
        <div className="w-[30%]">
          <TextInput
            label="Nom"
            required
            name="lastname"
            value={initialState["lastname"]}
            onChange={handleChange}
            // formik={formik}
          />
        </div>
        <div className="w-[30%]">
          <TextInput
            label="Prénom"
            required
            name="firstname"
            onChange={handleChange}
            value={initialState["firstname"]}
          />
        </div>
        <div className="w-[30%]">
          <TextInput
            label="Pseudo"
            required
            name="name"
            value={initialState["name"]}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-[20px] w-full">
        <div className="w-[30%]">
          <TextInput
            label="Email"
            required
            name="email"
            value={initialState["email"]}
            onChange={handleChange}
          />
        </div>
        <div className="w-[30%]">
          <PasswordInput
            label="Mot de passe"
            required
            value={initialState["password"]}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="w-[30%]">
          <Switch
            label="Intérlocuteur"
            name="isInterlocutor"
            checkedText="OUI"
            uncheckedText="NON"
            onChange={handleChange}
          />
          {/* <PasswordInput
            label="Mot de passe"
            required
            value={initialState["password"]}
            name="password"
            onChange={handleChange}
          /> */}
        </div>
      </div>
      {/* <DateRange name="times_range" label="Plage Horaire" formik={formik} /> */}
      <div className="flex flex-col gap-[10px] mt-[20px]">
        <label htmlFor="" className="flex w-[300px] justify-between">
          {" "}
          Plage horaire{" "}
          <span
            onClick={onAddTimeHandler}
            className="bg-primary text-white rounded-[50%] w-[25px] h-[25px] flex justify-center items-center cursor-pointer "
          >
            {" "}
            +{" "}
          </span>{" "}
        </label>
        {defaultTime.map((times: any, index: number) => (
          <div className="flex gap-[10px] w-[30%] items-center" key={index}>
            <TimeRange
              name=""
              value={formatDefaultTime(times)}
              onChange={(e) => onChangeTime(e, index)}
            />
            {index !== 0 ? (
              <MdOutlineDeleteOutline
                onClick={() => onRemoveTimeHandler(index)}
                className="cursor-pointer h-[20px] w-[20px] hover:bg-primary rounded-[50%] p-[2px] hover:text-white"
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end ">
        <Button typeButton="primary" isTypeSubmit>
          {isLoadingSubmit ? <Spinner /> : "Valider"}
        </Button>
      </div>
    </FormCustom>
  );
};
