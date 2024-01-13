import { Button } from "@/shared/ui/button/Button";
import { Divider } from "@/shared/ui/divider/Divider";
import { InputNumber } from "@/shared/ui/inputNumber/InputNumber";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { FC, useEffect, useState } from "react";

interface IFormAverageCosts {
    handleSubmit: (e: any, handleReset: () => void) => void;
    selected?: any;
}

export const FormAverageCosts: FC<IFormAverageCosts> = ({
    handleSubmit,
    selected
}) => {
    const [averageCost, setAverageCost] = useState<any>();

    useEffect(() => {
        setAverageCost(selected)
    }, [selected])

    const handleChange = (e: any) => {
        setAverageCost((prev: any) => ({ ...prev, ...e }));
    }
    const handleReset = () => {
        console.log("Form reset")
        setAverageCost({});
    }
    return (
        <form
            onSubmit={() => handleSubmit}
            className="my-[50px] flex flex-col gap-[20px]"
        >
            <div className="w-[30%]">
                <TextInput
                    label="libelle"
                    name="name"
                    value={averageCost?.name}
                    onChange={handleChange}
                />
            </div>
            <div className="w-[30%]">
                <InputNumber
                    label="cout"
                    name="cost"
                    value={averageCost?.cost}
                    onChange={handleChange}
                />
            </div>
            <Divider />
            <div className="flex justify-end gap-[10px]">
                {/* <Button typeButton="secondary">Annuler</Button> */}
                <Button onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(averageCost, handleReset);
                }}>
                    Enregistrer
                </Button>
            </div>
        </form >
    )
}