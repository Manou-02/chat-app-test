import { fetchAllvehicleBrands } from "@/features/flotte/vehicleBrands/actions";
import { useVehicleBrandsData, useVehicleBrandsRequests } from "@/features/flotte/vehicleBrands/lib";
import { fetchAllvehicleModels } from "@/features/flotte/vehicleModels/actions";
import { useVehicleModelsData, useVehicleModelsRequests } from "@/features/flotte/vehicleModels/lib";
import { fetchAllVehicles } from "@/features/flotte/vehicles/actions";
import { useVehiclesRequests } from "@/features/flotte/vehicles/lib";
// import { createOneVehicle } from "@/features/vehicles/actions";
// import { useVehicleCreated } from "@/features/vehicles/lib";
import { VehiclesServices } from "@/features/flotte/vehicles/services/Vehicles.services";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { HttpStatus } from "@/shared/config/Status";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Button } from "@/shared/ui/button/Button";
import { Divider } from "@/shared/ui/divider/Divider";
import { FormCustom } from "@/shared/ui/form/Form";
import Select from "@/shared/ui/select/Select";
import Spinner from "@/shared/ui/spinner/Spinner";
// import Spinner from "@/shared/ui/spinner/Spinner";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Checkbox, DatePicker, Form } from "antd";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const FormVehicle = () => {
    const [form] = Form.useForm();
    const dispatch: any = useDispatch();
    const allVehicleBrands = useVehicleBrandsData()
    const allVehicleModels = useVehicleModelsData()

    const vehicleBrandsRequests = useVehicleBrandsRequests();
    const vehicleModelsRequests = useVehicleModelsRequests();
    const vehiclesRequests = useVehiclesRequests();

    const [checkHasTag, setCheckHasTag] = useState<boolean>(false);
    const [checkHasBuzzer, setCheckHasBuzzer] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchAllvehicleBrands(vehicleBrandsRequests));
        dispatch(fetchAllvehicleModels(vehicleModelsRequests));
    }, []);

    const [initialState, setInitialState] = useState<any>({

    });

    useEffect(() => {
        form.setFieldsValue(initialState)
    }, [initialState]);

    const [isLoading, setIsLoading] = useState<boolean>(false);


    // useEffect(() => {
    //     console.log("vehicleBrands ", initialState?.vehicleBrand);
    //     const a = allVehicleModels?.filter((vehicleModel: any) => (vehicleModel?.vehicleBrand?.id === initialState?.vehicleBrand));
    //     console.log("a ", a);

    // }, [initialState["vehicleBrand"]])

    const handleChange = (e: any) => {
        setInitialState((prev: any) => ({ ...prev, ...e }));
        if (e?.state) {
            setInitialState((prev: any) => ({ ...prev, ...{ state: e?.state.value } }));
            return;
        }
        if (e?.type) {
            setInitialState((prev: any) => ({ ...prev, ...{ type: e?.type.value } }));
            return;
        }
        if (e?.typeOfEngine) {
            setInitialState((prev: any) => ({ ...prev, ...{ typeOfEngine: e?.typeOfEngine.value } }));
            return;
        }
        if (e?.vehicleBrand) {
            setInitialState((prev: any) => ({ ...prev, ...{ vehicleBrand: e?.vehicleBrand.value } }));
            return;
        }
        if (e?.vehicleModel) {
            setInitialState((prev: any) => ({ ...prev, ...{ vehicleModel: e?.vehicleModel.value } }));
            return;
        }
        if (e?.firstCirculationAt as Dayjs) {
            setInitialState((prev: any) => ({ ...prev, ...{ firstCirculationAt: e?.firstCirculationAt.format("YYYY-MM-DDTHH:mm:ss") } }));
            return;
        }
        if (e?.averageConsumption) {
            setInitialState((prev: any) => ({ ...prev, ...{ averageConsumption: +e?.averageConsumption } }));
            return;
        }
        if (e?.power) {
            setInitialState((prev: any) => ({ ...prev, ...{ power: +e?.power } }));
            return;
        }
        if (e?.unloadedWeight) {
            setInitialState((prev: any) => ({ ...prev, ...{ unloadedWeight: +e?.unloadedWeight } }));
            return;
        }
        if (e?.reservoirCapacity) {
            setInitialState((prev: any) => ({ ...prev, ...{ reservoirCapacity: +e?.reservoirCapacity } }));
            return;
        }
        if (e?.reservoirOilCapacity) {
            setInitialState((prev: any) => ({ ...prev, ...{ reservoirOilCapacity: +e?.reservoirOilCapacity } }));
            return;
        }
        if (e?.payload) {
            setInitialState((prev: any) => ({ ...prev, ...{ payload: +e?.payload } }));
            return;
        }
        if (e?.mileage) {
            setInitialState((prev: any) => ({ ...prev, ...{ mileage: +e?.mileage } }));
            return;
        }
        if (e?.target?.name === "hasBuzzer") {
            setCheckHasBuzzer(e?.target?.checked);
        }
        if (e?.target?.name === "hasTag") {
            setCheckHasTag(e?.target?.checked);
        }
    };

    const onLoadingHandler = () => {
        setIsLoading((prev: boolean) => !prev);
    };

    const handleSubmit = async () => {
        console.log("QWE");

        // e.preventDefault();
        onLoadingHandler();
        const vehicleToCreate = {
            // ...initialState,
            ...{ averageConsumption: initialState?.averageConsumption },
            ...{ chassisNumber: initialState?.chassisNumber },
            ...{ firstCirculationAt: initialState?.firstCirculationAt },
            ...{ gender: initialState?.gender },
            ...{ hasBuzzer: initialState?.hasBuzzer },
            ...{ hasTag: initialState?.hasTag },
            ...{ mileage: initialState?.mileage },
            ...{ payload: initialState?.payload },
            ...{ power: initialState?.power },
            ...{ registrationNumber: initialState?.registrationNumber },
            ...{ reservoirCapacity: initialState?.reservoirCapacity },
            ...{ reservoirOilCapacity: initialState?.reservoirOilCapacity },
            ...{ state: initialState?.state },
            ...{ type: initialState?.type },
            ...{ typeOfEngine: initialState?.typeOfEngine },
            ...{ unloadedWeight: initialState?.unloadedWeight },
            ...{ utility: initialState?.utility?.value },
            ...{ vehicleModel: !initialState?.vehicleModel ? null : `/vehicle_models/${initialState?.vehicleModel}` },
            ...{ vehicleBrand: !initialState?.vehicleBrand ? null : `/vehicle_brands/${initialState?.vehicleBrand}` },
            ...{ hasTag: checkHasTag },
            ...{ hasBuzzer: checkHasBuzzer },
        }
        console.log("vehicleToCreate ", vehicleToCreate);

        // setTimeout(() => {
        //     onLoadingHandler();
        // }, 3000);
        const { status, data } = await VehiclesServices.createVehicle(vehicleToCreate);
        if (status === HttpStatus.CREATED) {
            Toast.success("Ajouter avec succès.");
            dispatch(fetchAllVehicles(vehiclesRequests));

            dispatch(ActionReducer.setShowDrawer(false));
        } else {
            Toast.error(
                data?.status?.messageDetail?.split(":")[1] ||
                "Une erreur s'est produite, veuillez réessayer plus tard."
            );
        }
        onLoadingHandler();
    };

    return (

        <FormCustom
            form={form}
            onSubmit={handleSubmit}
            className="my-[50px] flex flex-col gap-[20px]"
        >
            <div className="">
                <div className="flex gap-[20px]">
                    <div className="w-[30%]">
                        <TextInput
                            label="Immatriculation"
                            name="registrationNumber"
                            value={initialState["registrationNumber"]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-[30%]">
                        <Select
                            name="state"
                            label="Etat"
                            placeholder="-- Sélectionner un Etat --"
                            value={initialState["state"]}
                            options={[
                                {
                                    label: "En cours de route",
                                    value: 0,
                                },
                                {
                                    label: "Disponible",
                                    value: 1,
                                },
                                {
                                    label: "Pas de chauffeur",
                                    value: 2,
                                },
                                {
                                    label: "En maintenance",
                                    value: 3,
                                },
                                {
                                    label: "A vendre",
                                    value: 4,
                                },
                                {
                                    label: "En congé",
                                    value: 5,
                                },
                                {
                                    label: "Accidenté",
                                    value: 6,
                                },
                                {
                                    label: "Assigné a une autre société",
                                    value: 7,
                                },
                            ]}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[30%]">
                        <TextInput
                            label="Consommation moyenne"
                            name="averageConsumption"
                            value={initialState["averageConsumption"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[30%] flex flex-col justify-start">
                        <label className="font-semibold">Date de première mise en circulation</label>
                        <DatePicker className="h-[42px]" name="firstCirculationAt" onChange={(e) => handleChange({ firstCirculationAt: e })} />
                    </div>
                </div>

                <div className="flex gap-[20px]">
                    <div className="w-[30%]">
                        <Checkbox checked={checkHasTag} name="hasTag" onChange={handleChange}>Balise</Checkbox>
                    </div>
                    <div className="w-[30%]">
                        <Checkbox checked={checkHasBuzzer} name="hasBuzzer" onChange={handleChange}>Buzzer</Checkbox>
                    </div>
                    <div className="w-[30%]">
                        <TextInput
                            label="Puissance"
                            name="power"
                            value={initialState["power"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[30%]">
                        <TextInput
                            label="Poids vide"
                            name="unloadedWeight"
                            value={initialState["unloadedWeight"]}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex gap-[20px]">
                    <div className="w-[30%]">
                        <TextInput
                            label="Capacité du réservoir d'huile"
                            name="reservoirOilCapacity"
                            value={initialState["reservoirOilCapacity"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[30%]">
                        <TextInput
                            label="Charge utile"
                            name="payload"
                            value={initialState["payload"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[30%]">
                        <Select
                            name="utility"
                            label="Utilité"
                            placeholder="-- Sélectionner un utilité --"
                            value={initialState["utility"]}
                            options={[
                                {
                                    label: "Transport Import/Export",
                                    value: 1,
                                },
                                {
                                    label: "Transport en ville",
                                    value: 2,
                                },
                                {
                                    label: "Voiture de service",
                                    value: 3,
                                }
                            ]}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[30%]">
                        <Select
                            name="typeOfEngine"
                            label="Type de moteur"
                            placeholder="-- Sélectionner un type de moteur --"
                            value={initialState["typeOfEngine"]}
                            options={[
                                {
                                    label: "1",
                                    value: 1,
                                },
                                {
                                    label: "2",
                                    value: 2,
                                },
                                {
                                    label: "3",
                                    value: 3,
                                },
                                {
                                    label: "4",
                                    value: 4,
                                },
                                {
                                    label: "5",
                                    value: 5,
                                },
                                {
                                    label: "6",
                                    value: 6,
                                }
                            ]}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex gap-[20px]">
                    <div className="w-[30%]">
                        <TextInput
                            label="Genre"
                            name="gender"
                            value={initialState["gender"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[30%]">
                        <Select
                            name="vehicleBrand"
                            label="Marque du véhicule"
                            placeholder="-- Sélectionner une Marque --"
                            value={initialState["vehicleBrand"]}
                            options={allVehicleBrands.map((brand: { id: number, name: string }) => {
                                return {
                                    label: brand.name,
                                    value: brand.id
                                }
                            })}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-[30%]">
                        <Select
                            name="vehicleModel"
                            label="Modele du véhicule"
                            placeholder="-- Sélectionner une modèle --"
                            value={initialState["vehicleModel"]}
                            options={allVehicleModels?.filter((vehicleModel: any) => (vehicleModel?.vehicleBrand?.id === initialState?.vehicleBrand))?.map((brand: { id: number, name: string }) => {
                                return {
                                    label: brand.name,
                                    value: brand.id
                                }
                            })}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-[30%]">
                        <Select
                            name="type"
                            label="Type"
                            placeholder="-- Sélectionner un type --"
                            value={initialState["type"]}
                            required
                            options={[
                                {
                                    label: "Plateau",
                                    value: 4,
                                },
                                {
                                    label: "Semi",
                                    value: 2,
                                },
                                {
                                    label: "Remorque",
                                    value: 1,
                                },
                                {
                                    label: "élévateur",
                                    value: 3,
                                },

                            ]}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex gap-[20px]">
                    <div className="w-[24%]">
                        <TextInput
                            label="Kilométrage"
                            name="mileage"
                            value={initialState["mileage"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[24%]">
                        <TextInput
                            label="Numéro de chassis"
                            name="chassisNumber"
                            value={initialState["chassisNumber"]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-[24%]">
                        <TextInput
                            label="Capacité du réservoir"
                            name="reservoirCapacity"
                            value={initialState["reservoirCapacity"]}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <Divider />

            <div className="flex justify-end gap-[10px] h-[40px]">
                <Button typeButton="secondary">Annuler</Button>
                <Button isTypeSubmit>
                    {isLoading ? <Spinner /> : "Enregistrer"}
                </Button>
            </div>
        </FormCustom>
    )
}
