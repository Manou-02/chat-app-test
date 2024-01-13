import { Button } from "@/shared/ui/button/Button";
import { InputNumber } from "@/shared/ui/inputNumber/InputNumber";
import { Divider } from "antd";
import { FC, useEffect, useState } from "react"

interface IFormContainerTypes {
    handleSubmit: (e: any, handleReset: () => void) => void;
    selected?: any;
}

export const FormContainerTypes: FC<IFormContainerTypes> = ({
    handleSubmit,
    selected
}) => {
    const [containerType, setContainerType] = useState<any>();

    useEffect(() => {
        setContainerType(selected)
    }, [selected])

    const handleChange = (e: any) => {
        setContainerType((prev: any) => ({ ...prev, ...e }));
    }

    const handleReset = () => {
        console.log("Form reset")
        setContainerType({});
    }
    return (
        <form
            onSubmit={() => handleSubmit}
            className="my-[50px] flex flex-col gap-[20px]"
        >
            <div className="w-[30%]">
                <InputNumber
                    label="Dimension"
                    name="unite"
                    value={containerType?.unite}
                    onChange={handleChange}
                />
            </div>
            <Divider />
            <div className="flex justify-end gap-[10px]">
                {/* <Button typeButton="secondary">Annuler</Button> */}
                <Button onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(containerType, handleReset);
                }}>
                    Enregistrer
                </Button>
            </div>
        </form>
    )
}