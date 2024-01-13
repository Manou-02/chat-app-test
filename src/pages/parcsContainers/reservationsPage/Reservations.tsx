import { AppDispatch } from "@/app/appStore";
import {
    useReservationData,
    useReservationLoading,
    useReservationPagination,
    useReservationRequests,
} from "@/features/parcsContainers/reservations/lib";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { AddFormReservations } from "@/widgets/parcsContainers/reservations/addFormReservations";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllReservation } from "@/features/parcsContainers/reservations/actions";
import { PaginationType } from "@/entities/pagination/Pagination";
import dayjs from "dayjs";
import { EditFormReservations } from "@/widgets/parcsContainers/reservations/editFormReservations";

type ReservationsType = {
    id: number;
    num: string;
    finalClient: string;
    companieMaritime: string;
    numContainer: string;
    getOutDate: string;
    refBooking: string;
    shippingCompany: {
        name: string;
        id: number;
    };
    client: {
        refCustomer: string;
    };
    containers: any;
};

export const Reservations = () => {
    const dispatch: AppDispatch = useDispatch();
    const reservationData = useReservationData();
    const isLoadingReservation = useReservationLoading();
    const reservationPagiantion: PaginationType = useReservationPagination();
    const reservationRequest = useReservationRequests();

    const [isLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>(null);

    const columnHelperUsers = createColumnHelper<ReservationsType>();

    const columns: ColumnDef<ReservationsType, any>[] = [
        columnHelperUsers.accessor("refBooking", {
            header: () => <span>N° Booking</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: false,
            enableSorting: true,
            enableHiding: true,
        }),
        columnHelperUsers.accessor("client.refCustomer", {
            header: () => <span>Client finale</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: false,
            enableSorting: true,
            enableHiding: true,
        }),
        columnHelperUsers.accessor("shippingCompany.name", {
            header: () => <span>Compagnie maritime</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: false,
            enableSorting: true,
            enableHiding: true,
        }),
        // columnHelperUsers.accessor("companieMaritime", {
        //   header: () => <span>Compagnie Maritime</span>,
        //   cell: (props) => props.getValue(),
        //   enableColumnFilter: false,
        //   enableSorting: true,
        //   enableHiding: true,
        // }),
        columnHelperUsers.accessor("containers", {
            header: () => <span>N° de Container</span>,
            cell: (props) => (
                <span>
                    {" "}
                    {props
                        .getValue()
                        ?.map((item: any) => item?.containerNumber)
                        ?.join(" / ")}{" "}
                </span>
            ),
            enableColumnFilter: false,
            enableSorting: true,
            enableHiding: true,
        }),
        columnHelperUsers.accessor("containers", {
            header: () => <span>Get out </span>,
            cell: (props) => {
                return (<span>
                    {" "}
                    {props
                        .getValue()
                        ?.map((item: any) => item?.isGetOut ? "Fait" : "A faire")
                        ?.join(" / ")}{" "}
                </span>)
            }
            ,
            //   cell: (props) => dayjs(props.getValue()).format("DD/MM/YYYY"),
            enableColumnFilter: false,
            enableSorting: true,
            enableHiding: true,
        }),
        columnHelperUsers.accessor("containers", {
            header: () => <span>Get out au plus tard</span>,
            cell: (props) => {
                return (<span>
                    {" "}
                    {props
                        .getValue()
                        ?.map((item: any) => dayjs(item?.dateToGetOut).format("DD/MM/YYYY"))
                        ?.join(" - ")}{" "}
                </span>)
            }
            ,
            //   cell: (props) => dayjs(props.getValue()).format("DD/MM/YYYY"),
            enableColumnFilter: false,
            enableSorting: true,
            enableHiding: true,
        }),
    ];

    useEffect(() => {
        dispatch(fetchAllReservation({ ...reservationRequest, ...{ isCancelled: false } }));
    }, []);

    const handleChangeRequest = (e: any) => {
        dispatch(fetchAllReservation({ ...reservationRequest, ...e }));
    };

    const handleSuccess = () => {
        dispatch(fetchAllReservation({ ...reservationRequest, ...{ isCancelled: false } }));
    };

    return (
        <div>
            <Loader isLoading={isLoading || isLoadingReservation} />
            <Table
                title="Réservations"
                tableTitle="Liste des réservations"
                data={reservationData}
                columns={columns}
                isCanHiddenColumn
                drawerWidth={1400}
                // isDrawerFullScreen
                isEnableAdd
                isCanEdit
                addFormContent={
                    <AddFormReservations onSuccess={handleSuccess} selected={null} />
                }
                editFornContent={
                    <EditFormReservations onSuccess={handleSuccess} selected={selected} />
                }
                // editFornContent={<ClientsForm />}
                onSearch={handleChangeRequest}
                onChangePage={handleChangeRequest}
                onFilter={handleChangeRequest}
                onGetValue={(e: any) => {
                    setSelected({
                        ...e,
                        ...{ dateRelease: dayjs(e?.dateRelease) }
                    })
                }}
                pagination={{
                    defaultCurrentPage: reservationPagiantion?.current || 1,
                    totalItems: reservationPagiantion?.totalItems || 0,
                    itemsPerPage: reservationPagiantion?.itemsPerPage || 10,
                }}
            />
        </div>
    );
};
