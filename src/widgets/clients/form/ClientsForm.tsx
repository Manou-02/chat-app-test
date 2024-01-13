import { AppDispatch } from "@/app/appStore";
import { ClientsServices } from "@/features/clients/services/Clients.services";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { HttpStatus } from "@/shared/config/Status";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Button } from "@/shared/ui/button/Button";
import { Checkbox } from "@/shared/ui/checkbox/Checkbox";
import { Divider } from "@/shared/ui/divider/Divider";
import { Loader } from "@/shared/ui/loader/Loader";
import Select from "@/shared/ui/select/Select";
import Spinner from "@/shared/ui/spinner/Spinner";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Title } from "@/shared/ui/title/Title";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type TypeCustomers = { id: number; name: string };

type PropsType = {
  selected?: any;
  onSuccess: () => void;
};
const defaultState = {
  supplier: false,
};
export const ClientsForm = ({ selected, onSuccess }: PropsType) => {
  const dispatch: AppDispatch = useDispatch();

  const [initialState, setInitialState] = useState<any>(defaultState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [customersType, setCustomersType] = useState<Array<TypeCustomers>>([]);

  useEffect(() => {
    getCustomersTypes();
  }, []);

  useEffect(() => {
    if (selected) {
      setInitialState({
        ...selected,
        customerType: {
          label: selected?.customerType?.name,
          value: selected?.customerType?.id,
        },
      });
    } else {
      setInitialState(defaultState);
    }
  }, [selected]);

  const getCustomersTypes = async () => {
    try {
      setIsLoading(true);
      const { status, data } = await ClientsServices.getAllCustomerType();
      if (status === HttpStatus.OK) {
        setCustomersType(data?.data || []);
      } else {
        setCustomersType([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setIsLoadingAdd(true);
      const dataToPost = {
        ...initialState,
        customerType: `/customer_types/${initialState?.customerType?.value}`,
      };

      if (!selected) {
        const { status, data } = await ClientsServices.createCustomer(
          dataToPost
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
        const { status, data } = await ClientsServices.updateCustomer(
          dataToPost
        );
        if (status === HttpStatus.CREATED || status === HttpStatus.OK) {
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
      Toast.error("Une erreur s'est produite, veuillez réessayer plus tard.");
    } finally {
      setIsLoadingAdd(false);
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <form
        onSubmit={handleSubmit}
        className="my-[50px] flex flex-col gap-[20px]"
      >
        <div className="flex gap-[20px] w-full">
          <div className="w-[30%]">
            <TextInput
              label="Référence client"
              name="refCustomer"
              value={initialState["refCustomer"]}
              onChange={handleChange}
              isDisable
            />
          </div>
          <div className="w-[30%]">
            <Select
              name="customerType"
              label="Type de client"
              placeholder="-- Sélectionner un type --"
              value={initialState["customerType"]}
              options={customersType?.map((item: TypeCustomers) => ({
                label: item.name,
                value: item.id,
              }))}
              onChange={handleChange}
            />
          </div>
        </div>
        <Divider />
        <div className="">
          <div className="mb-[20px]">
            <Title>Information personnelle</Title>
          </div>
          <div className="flex gap-[20px]">
            <div className="w-[30%]">
              <TextInput
                label="Nom"
                name="name"
                value={initialState["name"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="Prénom"
                name="firstname"
                value={initialState["firstname"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="Entreprise du client"
                name="customerCompany"
                value={initialState["customerCompany"]}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-[20px]">
            <div className="w-[30%]">
              <TextInput
                value={initialState["city"]}
                label="Ville"
                name="city"
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                value={initialState["adress"]}
                label="Adresse"
                name="adress"
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="N° CIN"
                value={initialState["cin"]}
                name="cin"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <Divider />

        <div className="">
          <div className="mb-[20px]">
            <Title>Information administrative</Title>
          </div>
          <div className="flex gap-[20px]">
            <div className="w-[30%]">
              <TextInput
                label="Numéro d'identité fiscale"
                name="nif"
                value={initialState["nif"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="N° statistique"
                name="nStat"
                value={initialState["nStat"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="Téléphone"
                value={initialState["telCompta"]}
                name="telCompta"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-[20px] items-center">
            <div className="w-[30%]">
              <TextInput
                label="Terme de payment par défaut"
                name="defaultPaymentTerm"
                value={initialState["defaultPaymentTerm"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <Checkbox
                onChange={handleChange}
                name="supplier"
                label="Fournisseur"
                checked={initialState["supplier"]}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-[10px]">
          <Button typeButton="secondary">Annuler</Button>
          <Button onClick={handleSubmit}>
            {isLoadingAdd ? <Spinner /> : "Enregistrer"}
          </Button>
        </div>
      </form>
    </>
  );
};
