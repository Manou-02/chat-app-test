import { AppDispatch, useDispatch } from "@/app/appStore";
import { Divider, Form, Input } from "antd";
import { FC, useEffect, useState } from "react";
import { Button } from "@/shared/ui/button/Button";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { VehicleBrandsServices } from "@/features/flotte/vehicleBrands/services/VehicleBrands.services";
import { useVehicleBrandsRequests } from "@/features/flotte/vehicleBrands/lib";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import Select from "@/shared/ui/select/Select";

interface IFormVehicleModels {
    handleSubmit: (e: any, handleReset: () => void) => void;
    selected?: any;
}

export const FormVehicleModels: FC<IFormVehicleModels> = ({
    handleSubmit,
    selected
}) => {
    const dispatch: AppDispatch = useDispatch();
    const [form] = Form.useForm();
    const { Item } = Form;
    // const { Option } = Select;
    const { setFieldsValue, resetFields } = form;
    const handleReset = () => {
        resetFields();
    };
    const [, setIsLoading] = useState<boolean>(false);
    const [allvehicleBrand, setAllVehicleBrand] = useState<any[]>();
    const vehicleBrandsRequests = useVehicleBrandsRequests();


    const getAllVehicleBrands = async () => {
        try {
            setIsLoading(true);
            const { status, data } = await VehicleBrandsServices.getAllVehicleBrand(vehicleBrandsRequests);
            if (status === HttpStatus.OK) {
                setAllVehicleBrand(data?.data);
            } else {
                Toast.error("Une erreur s'est produite, veuillez réessayer");
            }
        } catch (error) {
            console.log(error);
            // Toast.error("Une erreur s'est produite, veuillez réessayer");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllVehicleBrands();
        setFieldsValue(selected);
    }, [selected])


    return (
        <Form
            initialValues={selected}
            form={form}
            className="my-[50px] flex flex-col gap-[20px]"
            onFinish={(values: any) => {
                // console.log("VALUES ON SUBMIT ", values);
                handleSubmit(values, handleReset)
            }}
            onFinishFailed={(errorInfo) => {
                console.log("ERROR INFO ", errorInfo);
            }}
            autoComplete="off"
        >
            <Item name="id" label="id" hidden={true}>
                <Input type="text" />
            </Item>
            <Select
                name="vehicleBrand"
                label="Marque de la voiture"
                placeholder="-- Sélectionner un Etat --"
                options={allvehicleBrand?.map((vehicleBrand: any) => ({ label: vehicleBrand?.name, value: vehicleBrand?.id }))}
                onChange={() => null}
            />
            <TextInput
                label="Libelle"
                name="name"
                onChange={() => null}
                required
            />
            <Divider />
            <div className="flex justify-end gap-[10px]">
                <div className="block">
                    <Button
                        typeButton="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(ActionReducer.setShowDrawer(false));
                        }}
                    >
                        Annuler
                    </Button>
                </div>
                <Button
                    isTypeSubmit
                    onClick={(e) => {
                        e.preventDefault();
                        // console.log("getFieldValues() ", getFieldsValue());
                        // handleSubmit(folder, handleReset);
                    }}
                >
                    Enregistrer
                </Button>
            </div>
        </Form>
    )
}