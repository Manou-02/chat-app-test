import { FC, useState, useEffect } from "react";
import { Checkbox } from "@/shared/ui/checkbox/Checkbox";
import { Divider } from "@/shared/ui/divider/Divider";
import Select from "@/shared/ui/select/Select";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Textarea } from "@/shared/ui/textarea/Textarea";
import { Title } from "@/shared/ui/title/Title";
import { Form } from "antd";
import { FormCustom } from "@/shared/ui/form/Form";
import { Button } from "@/shared/ui/button/Button";
import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";
import { setCreateUserForm } from "@/features/users/reducers/CreateUser.reducer";
import { useStore } from "react-redux";
import { UsersServices } from "@/features/users/services/Users.services";
import { HttpStatus } from "@/shared/config/Status";
import { Loader } from "@/shared/ui/loader/Loader";
import { QualityService } from "@/features/setting/quality/services/QualityServices";
// import { CountryService } from "@/features/setting/country/services/Country.services";
// import { ProvinceServices } from "@/features/setting/provinces/services/Province.services";
import { CountryService } from "@/features/setting/country/services/Country.services";
import { ProvinceServices } from "@/features/setting/provinces/services/Province.services";
import { CustomerTypeServices } from "@/features/setting/customerType/services/CustomerType.services";

type PropsType = {
  handleNext?: () => void;
  handlePrev?: () => void;
};

export const Identification: FC<PropsType> = ({ handleNext }) => {
  const dispatch: AppDispatch = useDispatch();
  const store = useStore();
  const allIdentificationData = (store.getState() as any)?.createUserReducer
    ?.formState?.customerIdentification;
  const allState = (store.getState() as any)?.createUserReducer?.formState;

  const [form] = Form.useForm();
  const [initialState, setInitialState] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allInterlocutors, setAllInterlocutors] = useState<any[]>([]);
  const [allQuality, setAllQuality] = useState<any[]>([]);
  const [allCountries, setAllCountries] = useState<any[]>([]);
  const [allProvince, setAllProvince] = useState<any[]>([]);
  const [allCustomerType, setAllCustomerType] = useState<any[]>([])

  useEffect(() => {
    getListOfInterlocutor();
    getListOfQuality();
    getAllCountry();
    getAllProvince();
    getAllCustomerType();
  }, []);

  useEffect(() => {
    setInitialState((prev: any) => ({ ...prev, ...allIdentificationData }));
  }, [allIdentificationData]);

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [initialState]);

  const handleLoading = () => {
    setIsLoading((prev: boolean) => !prev);
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

  const getAllCustomerType = async () => {
    try {
      handleLoading();
      const { data, status } = await CustomerTypeServices.getAllCustomerType();
      if (status === HttpStatus.OK) {
        setAllCustomerType(
          data?.data?.map((item: any) => ({
            label: item?.name,
            value: item?.id,
          }))
        )
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleLoading();
    }
  };

  const getAllProvince = async () => {
    try {
      handleLoading();
      const { data, status } = await ProvinceServices.getAllProvinces({});
      if (status === HttpStatus.OK) {
        setAllProvince(
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
        console.log(data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleLoading();
    }
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

  const handleChange = (e: any): void => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
  };

  const handleSubmit = (values: any) => {
    dispatch(setCreateUserForm({ customerIdentification: values }));
    handleNext && handleNext();
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
                label="Référence"
                name="refCustomer"
                isDisable
                value={allState["refCustomer"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="Intitulé client"
                name="customerTitle"
                value={initialState["customerTitle"]}
                required
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="Abrégé"
                name="abbreviated"
                value={initialState["abbreviated"]}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-[20px] w-full">
            <div className="w-[30%]">
              <TextInput
                label="Nom du groupe"
                name="customerGroupName"
                value={initialState["customerGroupName"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <Select
                label="Type client"
                name="customerType"
                placeholder="-- Sélectionner --"
                value={initialState["customerType"]}
                options={allCustomerType}
                onChange={handleChange}
              />

            </div>

            {/* <div className="w-[30%]">
          <Select
            label="Qualité client"
            name="customerType"
            placeholder="-- Sélectionner --"
            // value={initialState["customerType"]}
            options={[]}
            onChange={handleChange}
          />
        </div> */}

            {/* <div className="w-[30%]">
          <TextInput
            label="Référence Sage"
            name="refCustomer"
            // value={initialState["refCustomer"]}
            onChange={handleChange}
          />
        </div> */}
          </div>

          <div className="flex gap-[20px] mb-[20px] w-full">
            <Checkbox
              label="Gérer en tant que prospect"
              name="prospect"
              checked={initialState["prospect"]}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-[20px] w-full">
            <div className="w-[30%]">
              <Select
                label="Interlocuteur"
                name="interlocutor"
                placeholder="-- Sélectionner --"
                value={initialState["interlocutor"]}
                options={allInterlocutors}
                onChange={handleChange}
              />
            </div>

            <div className="w-[30%]">
              <Select
                label="Qualité "
                name="quality"
                placeholder="-- Sélectionner --"
                value={initialState["quality"]}
                options={allQuality}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-[20px] mb-[20px] w-full">
            <Textarea
              label="Commentaire"
              name="comments"
              value={initialState["comments"]}
              onChange={handleChange}
            />
          </div>

          <div className="mb-[20px]">
            <Title size={15}>Coordonnées</Title>
            <Divider />
          </div>

          <div className="flex gap-[20px] w-full">
            <div className="w-[45%]">
              <TextInput
                label="Adresse"
                name="address"
                value={initialState["address"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[45%]">
              <TextInput
                label="Complément"
                name="complement"
                value={initialState["complement"]}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-[20px] w-full">
            <div className="w-[30%]">
              <Select
                label="Pays"
                name="country"
                placeholder="-- Sélectionner"
                value={initialState["country"]}
                onChange={handleChange}
                options={allCountries}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="Ville"
                name="city"
                value={initialState["city"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="Zone"
                name="localization"
                value={initialState["localization"]}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-[20px] w-full">
            <div className="w-[30%]">
              <TextInput
                label="District"
                name="district"
                value={initialState["district"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <Select
                label="Province"
                name="province"
                value={initialState["province"]}
                onChange={handleChange}
                options={allProvince}
                placeholder="-- Sélectionner --"
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

          <div className="flex gap-[20px] w-full">
            <div className="w-[30%]">
              <TextInput
                label="N° identification ou code fiscale"
                name="nif"
                value={initialState["nif"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="Stat"
                name="stat"
                value={initialState["stat"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="RCS"
                name="rcs"
                value={initialState["rcs"]}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-[20px] w-full">
            <div className="w-[30%]">
              <TextInput
                label="CIF"
                name="cif"
                value={initialState["cif"]}
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
                value={initialState["phone"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="LinkedIn"
                name="linkedin"
                value={initialState["linkedin"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="Email"
                name="email"
                value={initialState["email"]}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-[20px] w-full">
            <div className="w-[30%]">
              <TextInput
                label="Site internet"
                name="siteInternet"
                value={initialState["siteInternet"]}
                onChange={handleChange}
              />
            </div>
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
