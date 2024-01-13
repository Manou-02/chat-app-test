import { Card, Switch } from "antd";
import { HeaderDetailVehicle } from "./HeaderDetailVehicle/HeaderDetailVehicle";
import { FC } from "react";
import { Vehicle } from "@/entities/flotte/Vehicle";

type ICardDetailVehicle = {
    vehicle: Vehicle;
}

export const CardDetailVehicle: FC<ICardDetailVehicle> = ({ vehicle }) => {
    const { registrationNumber,
        type,
        reservoirCapacity,
        firstCirculationAt,
        chassisNumber,
        typeOfEngine,
        averageConsumption,
        power,
        unloadedWeight,
        reservoirOilCapacity,
        payload
    } = vehicle;

    const inputDate = new Date(firstCirculationAt);
    const day = String(inputDate.getDate()).padStart(2, '0');
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const year = inputDate.getFullYear();
    const firstCirculationAtFormatted = `${day}/${month}/${year}`;

    return (
        <Card
            className="w-[100%]"
            title={
                <HeaderDetailVehicle vehicle={vehicle} />
            } bordered={false}>
            <div className="flex-col mx-[40px]">
                <div className="my-[16px]">
                    Numero du véhicule: {registrationNumber?.substring(0, 4)}
                </div>
                <div className="my-[16px]">
                    Genre: {(type === 1 ? "Remorque" : "Tracteur")}
                </div>
                <div className="my-[16px]">
                    Consommation moyenne de carburant /km (L): {averageConsumption}
                </div>
                <div className="my-[16px]">
                    Date de 1ère mise en circulation: {firstCirculationAtFormatted}
                </div>
                <div className="my-[16px]">
                    VIN / Numero de chassis: {chassisNumber}
                </div>
                <div className="my-[16px]">
                    Type de moteur: {typeOfEngine}
                </div>
                <div className="flex my-[16px]">
                    <div className="w-[100px]">
                        Balise:
                    </div>
                    <div className="flex-1">
                        <Switch checkedChildren="oui" unCheckedChildren="non" />
                    </div>
                </div>
                <div className="flex my-[16px]">
                    <div className="w-[100px]">
                        Buzzer:
                    </div>
                    <div className="flex-1">
                        <Switch checked checkedChildren="oui" unCheckedChildren="non" />
                    </div>
                </div>
                <div className="flex my-[16px]">
                    Puissance (CV): {power}
                </div>
                <div className="flex my-[16px]">
                    Poids à vide (kg): {unloadedWeight}
                </div>
                <div className="flex my-[16px]">
                    Capacité reservoir (L): {reservoirCapacity}
                </div>
                <div className="flex my-[16px]">
                    Capacité reservoir d'huile: {reservoirOilCapacity}
                </div>
                <div className="flex my-[16px]">
                    Charge utile (kg) : {payload}
                </div>
            </div>
        </Card>
    )
}
