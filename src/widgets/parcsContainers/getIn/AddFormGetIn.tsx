import { AppDispatch } from "@/app/appStore";
import { GetInService } from "@/features/parcsContainers/getIn/services/GetIn.services";
import { TerminalServices } from "@/features/parcsContainers/terminalContainer/services/Terminal.services";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { HttpStatus } from "@/shared/config/Status";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Button } from "@/shared/ui/button/Button";
import { InputNumber } from "@/shared/ui/inputNumber/InputNumber";
import { Radio } from "@/shared/ui/radio/radioGroup/RadioGroup";
import Select from "@/shared/ui/select/Select";
import Spinner from "@/shared/ui/spinner/Spinner";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

type PropsType = {
  onSuccess: () => void;
};

const initialValueContainerType = {
  containerNumber: "",
  typeContainer: null,
  containerStatus: "",
  containerStatusAble: null,
};

const constainerState = [
  {
    label: "Très bon",
    value: "tres_bon",
  },
  {
    label: "Bon",
    value: "bon",
  },
  {
    label: "Mauvais",
    value: "bon",
  },
];

const containerType = [
  {
    label: "20",
    value: 20,
  },
  {
    label: "40",
    value: 40,
  },
];

export const AddFormGetIn = ({ onSuccess }: PropsType) => {
  const dispatch: AppDispatch = useDispatch();

  const [initialState, setInitialState] = useState<any>({
    numberContainer: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedContainerType, setSelectedContainerType] = useState<
    Array<any>
  >([]);
  const [allTransporter, setAllTransporter] = useState<Array<any>>([]);
  const [allShipping, setAllShipping] = useState<Array<any>>([]);
  const [allTerminal, setAllTerminal] = useState<Array<any>>([]);
  const [selectContainerState] = useState<Array<any>>(constainerState);
  const [containerTypeList] = useState<Array<any>>(containerType);

  useEffect(() => {
    let state: Array<any> = [];
    for (let i = 0; i < initialState?.numberContainer; i++) {
      state = [...state, initialValueContainerType];
    }
    setSelectedContainerType(state);
  }, [initialState.numberContainer]);

  useEffect(() => {
    getTransporter();
    getAllShipping();
    getAllTerminal();
  }, []);

  const getTransporter = async () => {
    try {
      setIsLoading(true);
      const { status, data } = await GetInService.getAllTransporter();
      if (status === HttpStatus.OK) {
        setAllTransporter(data?.data);
      } else {
        Toast.error("Une erreur s'est produite, veuillez réessayer");
      }
    } catch (error) {
      console.log(error);
      Toast.error("Une erreur s'est produite, veuillez réessayer");
    } finally {
      setIsLoading(false);
    }
  };
  const getAllShipping = async () => {
    try {
      setIsLoading(true);
      const { status, data } = await GetInService.getAllShipingCompanies();
      if (status === HttpStatus.OK) {
        setAllShipping(data?.data);
      } else {
        Toast.error("Une erreur s'est produite, veuillez réessayer");
      }
    } catch (error) {
      console.log(error);
      Toast.error("Une erreur s'est produite, veuillez réessayer");
    } finally {
      setIsLoading(false);
    }
  };
  const getAllTerminal = async () => {
    try {
      setIsLoading(true);
      const { status, data } = await TerminalServices.getAllTerminal();
      if (status === HttpStatus.OK) {
        setAllTerminal(data?.data);
      } else {
        Toast.error("Une erreur s'est produite, veuillez réessayer");
      }
    } catch (error) {
      console.log(error);
      Toast.error("Une erreur s'est produite, veuillez réessayer");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
  };

  const onLoadingHandler = () => {
    setIsLoading((prev: boolean) => !prev);
  };

  const handleChangeContainer = (e: any, index: number) => {
    setSelectedContainerType((prev: any) =>
      prev?.map((types: any, key: number) => {
        if (key !== index) {
          return types;
        } else {
          return {
            ...types,
            ...e,
          };
        }
      })
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    onLoadingHandler();
    try {
      setIsLoading(true);

      const dataToSend = {
        ...initialState,
        carrier: initialState?.carrier?.value
          ? `/transporters/${initialState?.carrier?.value}`
          : null,
        shippingCompany: initialState?.shippingCompany?.value
          ? `/shipping_companies/${initialState?.shippingCompany?.value}`
          : null,
        terminal: initialState?.terminal?.value
          ? `/terminals/${initialState?.terminal?.value}`
          : null,
        containers: selectedContainerType?.map((item: any) => ({
          ...item,
          containerStatus: item?.containerStatus?.value,
          typeContainer: item?.typeContainer?.value,
        })),
      };

      const { status, data } = await GetInService.createGetIn(dataToSend);
      if (status === HttpStatus.CREATED) {
        Toast.success("Ajouter avec succès.");
        dispatch(ActionReducer.setShowDrawer(false));
        onSuccess();
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

  return (
    <form
      onSubmit={handleSubmit}
      className="my-[50px] flex flex-col gap-[20px]"
    >
      <div className="flex gap-[20px] w-full">
        <div className="w-[30%]">
          <Select
            name="shippingCompany"
            label="Compagnie maritime"
            placeholder="-- Sélectionner --"
            value={initialState["shippingCompany"]}
            options={allShipping?.map((item: any) => ({
              label: item?.name,
              value: item?.id,
            }))}
            onChange={handleChange}
          />
        </div>

        <div className="w-[30%]">
          <Select
            name="carrier"
            label="Transporteur"
            placeholder="-- Sélectionner un transporteur --"
            value={initialState["carrier"]}
            options={allTransporter?.map((item: any) => ({
              label: item?.name,
              value: item?.id,
            }))}
            onChange={handleChange}
          />
        </div>
        <div className="w-[30%]">
          <TextInput
            label="N° de camions du transporteur"
            name="carrierTruckNumber"
            value={initialState["carrierTruckNumber"]}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-[20px] w-full">
        {/* <div className="w-[30%]">
          <Radio
            label="Statut"
            name="statut"
            value={initialState["statut"]}
            onChange={handleChange}
            options={[
              {
                label: "Apte",
                value: "apte",
              },
              {
                label: "Inapte",
                value: "inapte",
              },
            ]}
          />
        </div> */}
        <div className="w-[30%]">
          <TextInput
            label="Numero BDR:"
            name="noDocumentTransport"
            value={initialState["noDocumentTransport"]}
            onChange={handleChange}
          />
        </div>
        <div className="w-[30%]">
          <Select
            name="terminal"
            label="Terminal"
            placeholder="-- Sélectionner un terminal --"
            value={initialState["terminal"]}
            options={allTerminal?.map((item: any) => ({
              label: `${item?.center?.name} / ${item?.name}`,
              value: item?.id,
            }))}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-[20px] w-full">
        <div className="w-[30%]">
          <InputNumber
            label="Nombre de container"
            name="numberContainer"
            max={2}
            value={initialState["numberContainer"]}
            onChange={handleChange}
          />
        </div>
      </div>
      {selectedContainerType?.map((item: any, index: number) => (
        <div
          className="border rounded-[8px] p-[10px] border-accent"
          key={index}
        >
          <div className="flex gap-[20px] w-full">
            <div className="w-[30%]">
              <TextInput
                label="N° de container"
                name="containerNumber"
                value={item["containerNumber"]}
                onChange={(e: any) => handleChangeContainer(e, index)}
              />

              <div className="">
                {/* <Link path="/scan"> Ajouter le scan </Link> */}
              </div>
            </div>

            <div className="w-[30%]">
              <Select
                label={`Type de Container ${index + 1}`}
                name="typeContainer"
                placeholder="-- Sélectionner un type --"
                value={item["typeContainer"]}
                options={containerTypeList}
                onChange={(e: any) => handleChangeContainer(e, index)}
              />
            </div>

            <div className="w-[30%]">
              <Select
                label="Etat du container"
                name="containerStatus"
                placeholder="-- Sélectionner un transporteur --"
                value={item["containerStatus"]}
                options={selectContainerState}
                onChange={(e: any) => handleChangeContainer(e, index)}
              />
              <div className="my-[10px]">
                {/* <Link path="/scan"> Ajouter le scan </Link> */}
              </div>
            </div>
            <div className="w-[30%]">
              <Radio
                label="Statut"
                name="containerStatusAble"
                value={item["containerStatusAble"]}
                onChange={(e: any) => handleChangeContainer(e, index)}
                options={[
                  {
                    label: "Apte",
                    value: true,
                  },
                  {
                    label: "Inapte",
                    value: false,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end gap-[10px]">
        <Button onClick={handleSubmit}>
          {isLoading ? <Spinner /> : "Valider"}
        </Button>
      </div>
    </form>
  );
};
