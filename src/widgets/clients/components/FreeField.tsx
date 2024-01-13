import { Button } from "@/shared/ui/button/Button";
import { DatePicker } from "@/shared/ui/datePicker/DatePicker";
import { Divider } from "@/shared/ui/divider/Divider";
import { InputNumber } from "@/shared/ui/inputNumber/InputNumber";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Textarea } from "@/shared/ui/textarea/Textarea";
import { Title } from "@/shared/ui/title/Title";
import { UploadFile } from "@/shared/ui/upload/uploadFile/UploadFile";
import { useState, useEffect, FC } from "react";
import { Form } from "antd";
import { FormCustom } from "@/shared/ui/form/Form";
import { AppDispatch, store } from "@/app/appStore";
import { useDispatch } from "react-redux";
import { setCreateUserForm } from "@/features/users/reducers/CreateUser.reducer";
import Spinner from "@/shared/ui/spinner/Spinner";
import dayjs from "dayjs";

type PropsType = {
  isLoading?: boolean;
  handlePrev: () => void;
  handleFinish: () => void;
};

export const FreeField: FC<PropsType> = ({
  handleFinish,
  handlePrev,
  isLoading,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const allIFreeFieldData = (store.getState() as any)?.createUserReducer
    ?.formState?.customerFreeField;

  const [form] = Form.useForm();
  const [initialState, setInitialState] = useState<any>({});

  useEffect(() => {
    setInitialState((prev: any) => ({ ...prev, ...allIFreeFieldData }));
  }, [allIFreeFieldData]);

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [initialState]);

  const handleChange = (e: any) => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
    dispatch(
      setCreateUserForm({ customerFreeField: { ...initialState, ...e } })
    );
  };

  const handleSubmit = () => {
    dispatch(setCreateUserForm({ customerFreeField: initialState }));
    handleFinish();
  };

  return (
    <FormCustom
      form={form}
      onSubmit={handleSubmit}
      className="flex flex-col justify-between"
    >
      <div>
        <div className="mb-[20px]">
          <Title size={15}>Information libre</Title>
          <Divider />
        </div>
        <div className="flex gap-[20px] w-full">
          <div className="w-[30%]">
            <DatePicker
              label="Date de création société"
              name="dateCreation"
              value={
                initialState["dateCreation"]
                  ? dayjs(initialState["dateCreation"])
                  : null
              }
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <InputNumber
              label="Capital social"
              name="shareCapital"
              value={initialState["shareCapital"]}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <TextInput
              label="Actionnaire PAL"
              name="shareFolderPale"
              value={initialState["shareFolderPale"]}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex gap-[20px] w-full">
          <div className="w-[30%]">
            <DatePicker
              label="Date de négociation de règlement"
              name="negotiationRegulation"
              value={
                initialState["negotiationRegulation"]
                  ? dayjs(initialState["negotiationRegulation"])
                  : null
              }
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <TextInput
              label="Forme juridique"
              name="legalSatus"
              value={initialState["legalSatus"]}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-[20px]">
          <Title size={15}>Bloc note</Title>
          <Divider />
        </div>

        <div className="flex gap-[20px] w-full">
          <Textarea
            label=""
            name="blocNote"
            value={initialState["blocNote"]}
            onChange={handleChange}
          />
        </div>

        <div className="mb-[20px]">
          <Title size={15}>Documents attachés</Title>
          <Divider />
        </div>
        <div className="flex gap-[20px] w-full">
          <div className="w-[30%]">
            <TextInput
              label="Intitulé"
              name="title"
              value={initialState["title"]}
              onChange={handleChange}
            />
          </div>

          <div className="w-[30%]">
            <UploadFile
              label="Pièce jointe du Contrat"
              name="refCustomer"
              multiple
              // value={initialState["refCustomer"]}
              onChange={handleChange}
            />
            {/* <TextInput
            label="Pièce jointe Contrat"
            name="refCustomer"
            // value={initialState["refCustomer"]}
            onChange={handleChange}
          /> */}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end gap-[20px] h-[40px]">
        <Button typeButton="secondary-rounded" onClick={handlePrev}>
          Précédent
        </Button>
        <Button typeButton="secondary-rounded" isTypeSubmit>
          {isLoading ? <Spinner /> : "Terminer"}
        </Button>
      </div>
    </FormCustom>
  );
};
