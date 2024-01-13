import { ClientsServices } from "@/features/clients/services/Clients.services";
import { GetInService } from "@/features/parcsContainers/getIn/services/GetIn.services";
import { ReservationService } from "@/features/parcsContainers/reservations/services/Reservation.services";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { HttpStatus } from "@/shared/config/Status";
import { DatePicker } from "@/shared/ui/datePicker/DatePicker";
import Select from "@/shared/ui/select/Select";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@/shared/ui/button/Button";
import { TerminalServices } from "@/features/parcsContainers/terminalContainer/services/Terminal.services";
import { Divider, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import styles from "./style.module.scss";


export type Booking = {
    id?: number;
    refBooking?: string;
    client?: {
        refCustomer: string;
    };
    containers?: [
        {
            id?: string;
            containerNumber?: string,
            typeContainer?: number,
            containerStatus?: "bon" | "tres_bon" | "mauvais",
            containerStatusAble?: boolean,
            reservedStatus?: true,
            isGetOut?: true,
            booking?: string,
            dateToGetOut?: string
        }
    ];
    shippingCompany?: {
        id?: number;
        name?: string
    };
    dateRelease?: string;
}

interface IFormReservation {
    handleSubmit: (e: any, onSuccess?: () => void) => void;
    handleChange: (e: any) => void;
    booking?: any;
}

export const FormReservation: FC<IFormReservation> = ({
    handleSubmit,
    handleChange,
    booking,
}) => {
    const [allClients, setAllClients] = useState<any[]>([]);
    const [allShipping, setAllShipping] = useState<Array<any>>([]);
    const [, setAllContainers] = useState<Array<any>>([]);
    const [allTerminal, setAllTerminal] = useState<Array<any>>([]);
    const [
        ,
        setIsLoading
    ] = useState<boolean>(false);
    // const [isLoadingOperation, setIsLoadingOperation] = useState<boolean>(false);
    const [selectedTerminal, setSelectedTerminal] = useState<number>();
    const [defaultValueContainer, setDefaultValueContainer] = useState<any>({
        containerNumber: { label: "", value: null },
        dateToGetOut: dayjs(Date.now()),
        containerAvailable: []
    });

    const [addedContainer, setAddedContainer] = useState<any[]>([
        defaultValueContainer,
    ]);
    const [selectedContainer, setSelectedContainer] = useState<any[]>([]);

    const handleChangeTerminal = (e: any) => {
        setSelectedTerminal(e?.terminal?.value);
    }

    useEffect(() => {
        if (booking) {
            // getTerminal
            getTerminalFromContainer(booking?.containers[0]?.id);
            // TO EDIT
            const containersToEdit = booking?.containers?.map((container: any) => {
                return {
                    containerNumber: { value: container?.id, label: container?.containerNumber },
                    dateToGetOut: dayjs(container?.dateToGetOut),
                    containerAvailable: []
                }
            });
            setAddedContainer(containersToEdit);
        }
    }, [booking])

    useEffect(() => {
        // handleChange({
        //     containers: addedContainer?.map(((container: any) => {
        //         return {
        //             dateToGetOut: dayjs(container?.dateToGetOut).format("YYYY-MM-DD"),
        //             id: container?.containerNumber?.value as number,
        //         }
        //     }))
        // });
        // console.log("ADDED CONTAINER ", addedContainer);
        // if (booking) {
        //     // TO EDIT
        //     const containersToEdit = booking?.containers?.map((container: any) => {
        //         return {
        //             containerNumber: { value: container?.id, label: container?.containerNumber },
        //             dateToGetOut: dayjs(container?.dateToGetOut),
        //             containerAvailable: []
        //         }
        //     });
        //     setAddedContainer(containersToEdit);
        // }
    }, [addedContainer])

    const handleChangeContainer = (e: any, index: number) => {
        // console.log("e ", dayjs(e?.getOutDate).format("YYYY-MM-DD"),);
        // setAddedContainer((prev: any) => {
        //     const res = prev?.map((container: any, key: number) => {
        //         if (key === index) {
        //             return { ...container, ...e };
        //         } else {
        //             return container;
        //         }
        //     });
        //     setSelectedContainer(res);
        //     handleChange({
        //         containers: res?.map(((container: any) => {
        //             return {
        //                 dateToGetOut: dayjs(container?.dateToGetOut).format("YYYY-MM-DD"),
        //                 containerNumber: container?.containerNumber?.value as number,
        //             }
        //         }))
        //     })
        //     return res;
        // });
        if (Object.keys(e)[0] === "containerNumber") {
            setSelectedContainer((prev: any) => [...prev, Object.values(e)[0]])
            setAddedContainer((prev: any) => prev.map((item: any, indexItem: number) => {
                if (indexItem === index) {
                    return item;
                }
                else {
                    return {
                        ...item,
                        containerAvailable: item?.containerAvailable?.filter((av: any) => av.id !== (Object.values(e)[0] as any).value)
                    }
                }
            }))

            setDefaultValueContainer((prev: any) => ({ ...prev, containerAvailable: prev?.containerAvailable?.filter((av: any) => av.id !== (Object.values(e)[0] as any).value) }))
        }
        setAddedContainer((prev: any) => prev.map((item: any, indexItem: number) => {
            console.log("just e ", e)
            if (indexItem !== index) {
                return item;
            }
            else {
                return {
                    ...item,
                    ...e
                }
            }
        }));
    };

    const getTerminalFromContainer = async (id: number) => {
        try {
            setIsLoading(true);
            const { status, data } = await ReservationService.getOneGetIn(id);
            if (status === HttpStatus.OK) {
                setSelectedTerminal(data?.data?.terminalGetin?.terminal?.id);
            } else {
                Toast.error("Une erreur s'est produite, veuillez réessayer");
            }
        } catch (error) {
            // Toast.error("Une erreur s'est produite, veuillez réessayer");
        }
    }

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
            // Toast.error("Une erreur s'est produite, veuillez réessayer");
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

        } finally {
            setIsLoading(false);
        }
    }

    const getAllClients = async () => {
        try {
            setIsLoading(true);
            const { status, data } = await ClientsServices.getAllClients({});
            if (status === HttpStatus.OK) {
                setAllClients(data?.data);
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

    const getAllContainers = async (params: any) => {
        try {
            setIsLoading(true);
            const { status, data } = await ReservationService.getAllContiners(params);
            if (status === HttpStatus.OK) {
                setAllContainers(data?.data);
                setAddedContainer((prev: any) => (prev.map((item: any) => ({ ...item, containerAvailable: data?.data }))))
                setDefaultValueContainer((prev: any) => ({ ...prev, containerAvailable: data?.data }))
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

    useEffect(() => {
        getAllShipping();
        // getAllContainers({ isGetOut: null });
        getAllClients();
        getAllTerminal();
    }, []);

    useEffect(() => {
        getAllContainers({ "terminalGetin.terminal.id": selectedTerminal });
    }, [selectedTerminal])

    const onInrementContainer = () => {
        setAddedContainer((prev: any) => [...prev, {
            ...defaultValueContainer, containerAvailable: defaultValueContainer?.containerAvailable?.filter((ca: any) => selectedContainer.
                some((elsc) => elsc?.value !== ca.id))
        }]);
    };

    const onRemoveContainer = (index: number) => {
        setAddedContainer((prev: any[]) => {
            console.log("prev ", prev);
            return prev.filter((_: any, key: number) => index !== key)
        }
        );
    };

    // const onSuccess = () => {
    //     console.log("set Empty this form");
    // }

    return (
        <div
            // onSubmit={(e) => handleSubmit(e, onSuccess)}
            className="my-[50px] flex flex-col gap-[20px] h-[88%] justify-between"
        >
            <div className="flex-col">
                <div className="flex gap-[20px] items-center">
                    <div className="w-full mt-[20px]">
                        <TextInput
                            name="refBooking"
                            label="N. de booking"
                            placeholder="N. de booking"
                            value={booking?.refBooking}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full gap-[20px]">
                        <div className="w-[full] mt-[20px]">
                            <DatePicker
                                label="Date de sortie"
                                name="dateRelease"
                                value={booking?.dateRelease || dayjs(Date.now())}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-[20px] items-center">
                    <div className="w-full">
                        <Select
                            name="client"
                            label="Client"
                            placeholder="-- Sélectionner --"
                            value={booking?.client?.refCustomer}
                            options={allClients?.map((item: any) => ({
                                label: item?.refCustomer,
                                value: item?.id,
                            }))}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <Select
                            name="shippingCompany"
                            label="Compagnie maritime"
                            placeholder="-- Sélectionner --"
                            value={booking?.shippingCompany?.id}
                            options={allShipping?.map((item: any) => ({
                                label: item?.name,
                                value: item?.id,
                            }))}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex w-[100%] items-center mt-[18px]">
                    <div className="w-[50%] pr-[10px]">
                        <Select
                            name="terminal"
                            label="Terminal"
                            placeholder="-- Sélectionner --"
                            value={selectedTerminal}
                            options={allTerminal?.map((item: any) => ({
                                label: item?.name,
                                value: item?.id,
                            }))}
                            onChange={handleChangeTerminal}
                        />
                    </div>
                </div>

                <Divider />

                <div className=" flex gap-[20px] ">
                    <div className="w-[100%]">
                        {addedContainer?.map((item: any, index: number) => (
                            <div className="flex gap-[20px] justify-center items-center w-full">
                                <div className="w-full">
                                    <Select
                                        label="N° de container"
                                        name="containerNumber"
                                        placeholder="-- Sélectionner --"
                                        value={item?.containerNumber?.value}
                                        options={
                                            item?.containerAvailable.
                                                // allContainers?.
                                                // filter((c: any, indexAllCont: number) => selectedContainer.
                                                //     some((elsc) => elsc?.containerNumber?.value !== c.id)
                                                //     // {
                                                //     // const res = selectedContainer?.map(sc => {
                                                //     //     if (c?.id !== sc?.containerNumber?.value) {
                                                //     //         console.log("Container ", c);
                                                //     //         return c;
                                                //     //     }
                                                //     // });
                                                //     // return res;
                                                //     // }
                                                // ).
                                                map((item: any) => ({
                                                    label: item?.containerNumber ?? item?.id,
                                                    value: item?.id,
                                                }))}
                                        onChange={(e: any) => handleChangeContainer(e, index)}
                                    />
                                </div>

                                <div className="w-full gap-[20px] ">
                                    <div className="w-[full] ">
                                        <DatePicker
                                            label="Get out au plus tard"
                                            name="dateToGetOut"
                                            value={item["dateToGetOut"]}
                                            onChange={(e: any) => handleChangeContainer(e, index)}
                                        />
                                    </div>
                                </div>
                                {index !== 0 ? (
                                    <MdOutlineDeleteOutline
                                        onClick={() => onRemoveContainer(index)}
                                        className="cursor-pointer h-[20px] w-[20px] hover:bg-primary rounded-[50%] p-[2px] hover:text-white"
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        ))}
                    </div>
                    <span
                        onClick={onInrementContainer}
                        className="bg-primary text-white rounded-[50%] w-[25px] h-[25px] flex justify-center items-center cursor-pointer "
                    >
                        {" "}
                        +{" "}
                    </span>{" "}
                </div>
            </div>
            {
                booking ?
                    <>
                        <Divider />
                        <div className="flex gap-[20px]">
                            <div className="flex gap-[20px] flex-col items-center">
                                <div className="w-full mt-[20px] flex flex-col">
                                    <label className={`${styles.input__label}`}>est annule</label>
                                    <Switch
                                        onChange={(e) => handleChange({ ["isCancelled"]: e })}
                                        checkedChildren="oui" unCheckedChildren="non" />
                                </div>
                            </div>
                            {
                                (booking?.isCancelled ?
                                    <div className="flex gap-[20px] flex-col items-center">
                                        <div className="w-full mt-[20px]">
                                            <label className={`${styles.input__label}`}>Raison d'annulation</label>
                                            <TextArea
                                                name="cancelledReason"
                                                placeholder="cancelledReason"
                                                value={booking?.cancelledReason}
                                                onChange={(e) => handleChange({ ["cancelledReason"]: e?.target?.value })}
                                            />
                                        </div>
                                    </div>
                                    :
                                    null
                                )
                            }
                        </div>
                    </>
                    : null
            }
            <div className="flex justify-end gap-[10px] mb-[20px]">
                <Button onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(addedContainer)
                }}>
                    Valider
                </Button>
            </div>
        </div>
    )
}