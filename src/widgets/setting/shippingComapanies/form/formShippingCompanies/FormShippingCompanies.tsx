import { AppDispatch, useDispatch } from "@/app/appStore";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Button } from "@/shared/ui/button/Button";
import { Divider } from "@/shared/ui/divider/Divider";
import { Form, Input } from "antd";
import { FC, useEffect } from "react";
import { TextInput } from "@/shared/ui/textInput/TextInput";

interface IFormShippingCompanies {
    handleSubmit: (e: any, handleReset: () => void) => void;
    selected?: any;
}

export const FormShippingCompanies: FC<IFormShippingCompanies> = ({
    handleSubmit,
    selected
}) => {
    const dispatch: AppDispatch = useDispatch();
    const [form] = Form.useForm();
    const { Item } = Form;
    const { setFieldsValue, resetFields } = form;
    const handleReset = () => {
        resetFields();
    };
    useEffect(() => {
        setFieldsValue(selected);
    }, [selected])

    return (
        <Form
            initialValues={selected}
            form={form}
            className="my-[50px] flex flex-col gap-[20px]"
            onFinish={(values: any) => {
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
            <TextInput
                label="Companie"
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