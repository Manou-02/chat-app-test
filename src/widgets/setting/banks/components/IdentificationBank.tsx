import { AppDispatch, store } from "@/app/appStore";
import { setBanksFormData } from "@/features/setting/bank/reducers/BanksForm.reducers";
import { CountryService } from "@/features/setting/country/services/Country.services";
import { UsersServices } from "@/features/users/services/Users.services";
import { HttpStatus } from "@/shared/config/Status";
import { Button } from "@/shared/ui/button/Button";
import { Divider } from "@/shared/ui/divider/Divider";
import { FormCustom } from "@/shared/ui/form/Form";
import { Loader } from "@/shared/ui/loader/Loader";
import Select from "@/shared/ui/select/Select";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Title } from "@/shared/ui/title/Title";
import { Form } from "antd";
import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

type PropsType = {
  handleNext: () => void;
};

export const IdentificationBank: FC<PropsType> = ({ handleNext }) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const allData = (store.getState() as any)?.banksFormReducer?.state;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [initialState, setInitialState] = useState<any>({});
  const [allInterlocutors, setAllInterlocutors] = useState<any[]>([]);
  const [allCountries, setAllCountries] = useState<any[]>([]);

  useEffect(() => {
    getListOfInterlocutor();
    getAllCountry();
    setInitialState({ ...initialState, ...allData });
  }, []);

  useEffect(() => {
    setInitialState(allData);
  }, [allData]);

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [initialState]);

  const handleLoading = () => {
    setIsLoading((prev: boolean) => !prev);
  };

  const handleChange = (e: any) => {
    console.log("<>>>>>>>>>\n", e);

    setInitialState((prev: any) => ({ ...prev, ...e }));
    dispatch(setBanksFormData({ ...initialState, ...e }));
    console.log(initialState);
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
  const getListOfInterlocutor = async () => {
    try {
      handleLoading();
      const { data, status } = await UsersServices.getAllUsers({
        isInterlocutor: true,
      });
      if (status === HttpStatus.OK) {
        setAllInterlocutors(
          data?.data?.map((item: any) => ({
            label: item?.name,
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

  const handleSubmit = () => {
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
        <div className="">
          <div className="flex gap-[20px] w-full">
            <div className="w-[30%]">
              <TextInput
                label="Abrégé"
                name="abbreviation"
                required
                value={initialState["abbreviation"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="Intitulé"
                name="entitled"
                required
                value={initialState["entitled"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <Select
                label="Interlocuteur"
                name="interlocutor"
                placeholder="-- Séléctionner --"
                value={initialState["interlocutor"]}
                onChange={handleChange}
                options={allInterlocutors}
              />
            </div>
          </div>

          <div className="mb-[20px]">
            <Title size={15}>Coordonnées</Title>
            <Divider />
          </div>

          <div className="flex gap-[20px] w-full">
            <div className="w-[46%]">
              <TextInput
                label="Adresse"
                name="address"
                required
                value={initialState["address"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[46%]">
              <TextInput
                label="Complément"
                name="complement"
                value={initialState["complement"]}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-[20px] w-full">
          <div className="w-[30%]">
            <Select
              label="Pays"
              name="country"
              placeholder="-- Séléctionner --"
              required
              value={initialState["country"]}
              onChange={handleChange}
              options={allCountries}
            />
          </div>
          <div className="w-[30%]">
            <TextInput
              label="Ville"
              name="city"
              required
              value={initialState["city"]}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <TextInput
              label="Code postal"
              name="zipCode"
              value={initialState["zipCode"]}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-[20px]">
          <Title size={15}>Télécommunication</Title>
          <Divider />
        </div>

        <div className="flex gap-[20px] w-full">
          <div className="w-[30%]">
            <TextInput
              label="Téléphone"
              name="phone"
              required
              value={initialState["phone"]}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <TextInput
              label="Email"
              name="email"
              required
              value={initialState["email"]}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <TextInput
              label="Site internet"
              name="website"
              value={initialState["website"]}
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
