import { Vehicle } from "@/entities/flotte/Vehicle";
import { Divider, /*Select,*/ Switch, Tag } from "antd";
import { FC } from "react";

type IHeaderDetailVehicle = {
    vehicle: Vehicle;
}

export const HeaderDetailVehicle: FC<IHeaderDetailVehicle> = ({ vehicle }) => {
    const getDisponibility = (disponibility: number) => {
        switch (disponibility) {
            case 0:
                return <><Tag color="blue">En cours de route</Tag></>
            case 1:
                return <><Tag color="success">Disponible</Tag></>
            case 2:
                return <Tag color="warning">Pas de chauffeur</Tag>
            case 3:
                return <Tag color="error">En maintenance</Tag>
            case 4:
                return <Tag color="cyan">A vendre</Tag>
            case 5:
                return <Tag color="default">En congé</Tag>
        }
    }
    const { registrationNumber, vehicleBrand, type } = vehicle
    return (
        <>
            <div className="px-[40px]" style={{ fontWeight: "normal" }}>
                <div className="flex w-[100%] justify-between">
                    <div>
                        <span>
                            <span>Immatriculation: {registrationNumber}</span>

                            <span>{" "}{getDisponibility(vehicle?.state)}</span>
                        </span>
                        <div>
                            <div>{vehicleBrand?.name}</div>
                            <div>Centre: Transport Leong tamatave</div>
                            <div>Distance moyenne parcourue / mois: 800 km</div>
                            <div>Consommation moyenne au km | 12L / 100</div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end">
                        <div>
                            <div className="flex">
                                <div>
                                    <span>Allocation chauffeur </span>
                                    <Switch checkedChildren="oui" unCheckedChildren="non" />
                                </div>
                                {
                                    // if semi
                                    type === 2 && (
                                        <>
                                            <Divider type="vertical" />
                                            <div>
                                                <span>Allocation remorque </span>
                                                <Switch checkedChildren="oui" unCheckedChildren="non" />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            {/*<div className="flex justify-end">
                                <Select
                                    defaultValue="utility"
                                    style={{ width: 120 }}
                                    onChange={(value) => {
                                        console.log(value);
                                    }}
                                    options={[
                                        { value: 'utility', label: 'utilite' },
                                        { value: 'utility', label: 'utilite' },
                                        { value: 'utility', label: 'utilite' },
                                    ]}
                                />
                            </div>*/}
                        </div>
                    </div>
                </div>
                <div className="my-[4px]">
                    <span className="px-[12px] py-[5px]" style={{
                        borderBottom: "solid red"
                    }}>Etat</span>
                </div>
            </div>
        </>
    )
}
