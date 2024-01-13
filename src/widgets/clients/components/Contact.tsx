import { FC, useState, useEffect } from "react";
import { Form } from "antd";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import Select from "@/shared/ui/select/Select";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@/shared/ui/button/Button";
import { FormCustom } from "@/shared/ui/form/Form";
import { AppDispatch, store } from "@/app/appStore";
import { useDispatch } from "react-redux";
import { setCreateUserForm } from "@/features/users/reducers/CreateUser.reducer";
import { QualityService } from "@/features/setting/quality/services/QualityServices";
import { Loader } from "@/shared/ui/loader/Loader";
import { HttpStatus } from "@/shared/config/Status";

type PropsType = {
  handleNext: () => void;
  handlePrev: () => void;
};

const defaultState = {
  name: null,
  quality: null,
  phone: null,
};

export const Contact: FC<PropsType> = ({ handleNext, handlePrev }) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();

  const allCustomerContactData = (store.getState() as any)?.createUserReducer
    ?.formState?.customerContact;

  const [initialState, setInitialState] = useState<Array<any>>([defaultState]);
  const [allQuality, setAllQuality] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getListOfQuality();
  }, []);

  useEffect(() => {
    allCustomerContactData?.length
      ? setInitialState(allCustomerContactData)
      : setInitialState([defaultState]);
  }, [allCustomerContactData]);

  useEffect(() => {
    form.setFieldsValue({ customerContact: initialState });
  }, [initialState]);

  const handleLoading = () => {
    setIsLoading((prev: boolean) => !prev);
  };

  const getListOfQuality = async () => {
    try {
      handleLoading();
      const { data, status } = await QualityService.getAllQaulity({});
      if (status === HttpStatus.OK) {
        setAllQuality(
          data?.data?.map((item: any) => ({
            label: item?.label,
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

  const handleChange = (e: any, key: number) => {
    setInitialState((prev: any) =>
      prev?.map((item: any, index: number) => {
        if (key !== index) {
          return item;
        } else {
          return {
            ...item,
            ...e,
          };
        }
      })
    );
    dispatch(
      setCreateUserForm({
        customerContact: initialState?.map((item: any, index: number) => {
          if (key !== index) {
            return item;
          } else {
            return {
              ...item,
              ...e,
            };
          }
        }),
      })
    );
  };

  const handleIncrement = () => {
    setInitialState((prev: any) => [...prev, defaultState]);
  };

  const handleRemove = (key: number) => {
    setInitialState((prev: any) =>
      prev?.filter((_: any, index: number) => index !== key)
    );
  };

  const handleSubmit = () => {
    dispatch(setCreateUserForm({ customerContact: initialState }));
    handleNext && handleNext();
  };
  return (
    <>
      <Loader isLoading={isLoading} />
      <FormCustom
        form={form}
        onSubmit={handleSubmit}
        className="w-full h-[calc(100vh_-_100px)] flex flex-col justify-between"
      >
        <div className="flex flex-row-reverse ">
          <span
            onClick={handleIncrement}
            className="bg-primary text-white rounded-[50%] w-[25px] h-[25px] flex justify-center items-center cursor-pointer "
          >
            {" "}
            +{" "}
          </span>{" "}
          <div className="w-full">
            {initialState?.map((item: any, index: number) => (
              <div className="flex items-center" key={index}>
                <div className="flex gap-[20px] w-full">
                  <div className="w-[30%]">
                    <TextInput
                      label="Nom"
                      name="name"
                      value={item["name"]}
                      onChange={(e: any) => handleChange(e, index)}
                    />
                  </div>
                  <div className="w-[30%]">
                    <Select
                      label="Qualité"
                      name="qualite"
                      placeholder="-- Sélectionner --"
                      value={item["qualite"]}
                      options={allQuality}
                      onChange={(e: any) => handleChange(e, index)}
                    />
                  </div>
                  <div className="w-[30%]">
                    <TextInput
                      label="Téléphone"
                      name="phone"
                      value={item["phone"]}
                      onChange={(e: any) => handleChange(e, index)}
                    />
                  </div>
                </div>
                {index !== 0 ? (
                  <MdOutlineDeleteOutline
                    onClick={() => handleRemove(index)}
                    className="cursor-pointer h-[25px] w-[25px] hover:bg-primary rounded-[50%] p-[2px] hover:text-white"
                  />
                ) : (
                  <div className="h-[25px] w-[25px]"></div>
                )}
              </div>
            ))}
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
