import { AppDispatch, store } from "@/app/appStore";
import { setBanksFormData } from "@/features/setting/bank/reducers/BanksForm.reducers";
import { CountryService } from "@/features/setting/country/services/Country.services";
import { HttpStatus } from "@/shared/config/Status";
import { Button } from "@/shared/ui/button/Button";
import { FormCustom } from "@/shared/ui/form/Form";
import { Loader } from "@/shared/ui/loader/Loader";
import Select from "@/shared/ui/select/Select";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Form } from "antd";
import { FC, useState, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

type PropsType = {
  handlePrev: () => void;
  handleFinish: () => void;
};

const defaultState = {
  firstname: null,
  lastname: null,
  phone: null,
  email: null,
  country: null,
  civility: null,
};

export const ContactBank: FC<PropsType> = ({ handleFinish, handlePrev }) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<any>([defaultState]);
  const allData = (store.getState() as any)?.banksFormReducer?.state;
  const [alCountries, setAllCountries] = useState<any[]>([]);

  useEffect(() => {
    getAllCountry();
  }, []);

  // useEffect(() => {
  //   form.setFieldsValue(initialState);
  // }, [initialState]);

  useEffect(() => {
    if (!allData?.bankContacts?.length) {
      setInitialState([defaultState]);
    } else {
      setInitialState(allData?.bankContacts);
    }
  }, [allData]);

  const handleLoading = () => {
    setIsLoading((prev: boolean) => !prev);
  };

  const getAllCountry = async () => {
    try {
      handleLoading();
      const { data, status } = await CountryService.getAllCountries({});
      if (status === HttpStatus.OK) {
        setAllCountries(
          data?.data?.map((item: any) => ({
            label: item?.nameFr,
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

  const handleChange = (e: any, index: number) => {
    setInitialState((prev: any) =>
      prev?.map((item: any, key: number) => {
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
      setBanksFormData({
        bankContacts: initialState?.map((item: any, key: number) => {
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

  const handleDelete = (index: number) => {
    setInitialState((prev: any) =>
      prev?.filter((_: any, key: number) => key !== index)
    );
    dispatch(
      setBanksFormData({
        bankContacts: initialState?.filter(
          (_: any, key: number) => key !== index
        ),
      })
    );
  };

  const handleSubmit = () => {
    handleFinish();
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <FormCustom form={form} onSubmit={handleSubmit} className="">
        <div className="flex flex-col justify-between gap-[20px]">
          {initialState?.map((item: any, index: number) => (
            <div
              className="flex gap-[10px] border border-accent rounded-[8px]  p-[10px]"
              key={index}
            >
              <div className="w-full ">
                <div className="flex gap-[20px] w-full">
                  <div className="w-[30%]">
                    <Select
                      label="Civilité"
                      name="civility"
                      placeholder="-- Sélectionner"
                      value={item["civility"]}
                      onChange={(e: any) => handleChange(e, index)}
                      options={[
                        {
                          label: "Monsieur",
                          value: "Monsieur",
                        },
                        {
                          label: "Madame",
                          value: "Madame",
                        },
                        {
                          label: "Mademoiselle",
                          value: "MadameMademoiselle",
                        },
                      ]}
                    />
                  </div>
                  <div className="w-[30%]">
                    <TextInput
                      label="Nom"
                      name="lastname"
                      //required
                      value={item["lastname"]}
                      onChange={(e: any) => handleChange(e, index)}
                    />
                  </div>
                  <div className="w-[30%]">
                    <TextInput
                      label="Prènom"
                      name="firstname"
                      //required
                      value={item["firstname"]}
                      onChange={(e: any) => handleChange(e, index)}
                    />
                  </div>
                </div>
                <div className="flex gap-[20px] w-full">
                  <div className="w-[30%]">
                    <Select
                      label="Pays"
                      name="country"
                      //required
                      placeholder="-- Sélectionner --"
                      value={item["country"]}
                      onChange={(e: any) => handleChange(e, index)}
                      options={alCountries}
                    />
                  </div>
                  <div className="w-[30%]">
                    <TextInput
                      label="Téléphone"
                      name="phone"
                      //required
                      value={item["phone"]}
                      onChange={(e: any) => handleChange(e, index)}
                    />
                  </div>
                  <div className="w-[30%]">
                    <TextInput
                      label="Email"
                      name="email"
                      //required
                      value={item["email"]}
                      onChange={(e: any) => handleChange(e, index)}
                    />
                  </div>
                </div>
              </div>
              {index !== 0 ? (
                <MdOutlineDeleteOutline
                  onClick={() => handleDelete(index)}
                  className="cursor-pointer h-[25px] w-[25px] hover:bg-primary rounded-[50%] p-[2px] hover:text-white"
                />
              ) : (
                <div className="h-[25px] w-[25px]"></div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full my-[20px]">
          <span
            onClick={handleIncrement}
            className="rounded-[50px] bg-primary text-white py-[10px] px-[30px] cursor-pointer"
          >
            {" "}
            Ajouter{" "}
          </span>
        </div>

        <div className="w-full flex justify-end gap-[20px]  h-[40px]">
          <Button typeButton="secondary-rounded" onClick={handlePrev}>
            Précédent
          </Button>
          <Button typeButton="secondary-rounded" isTypeSubmit>
            Valider
          </Button>
        </div>
      </FormCustom>
    </>
  );
};
