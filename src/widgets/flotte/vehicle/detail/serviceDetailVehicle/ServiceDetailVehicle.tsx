import { Intervention } from "@/pages/flotte/vehicles/VehicleDetailPage";
import Table from "@/widgets/components/table/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DatePicker, DatePickerProps } from "antd";

export const ServiceDetailVehicle = () => {

    const onChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const dataVehicleInterventions: any[] = [
        {
            id: "1200",
            dateEnd: "14/08/2023",
            kilometrage: 1200,
            piece: "Plaquette disque",
            type: "curative",
            amount: 6000000
        },
        {
            id: "1223",
            dateEnd: "14/08/2023",
            kilometrage: 1200,
            piece: "Plaquette disque",
            type: "curative",
            amount: 6000000
        },
        {
            id: "1243",
            dateEnd: "14/08/2023",
            kilometrage: 1200,
            piece: "Plaquette disque",
            type: "curative",
            amount: 6000000
        }
    ];
    const columnHelperVehicle = createColumnHelper<Intervention>();


    const columns: ColumnDef<Intervention, any>[] = [
        columnHelperVehicle.accessor("id", {
            header: () => <span>Num. d'Intervention</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: true,
            enableSorting: true,
            // enableHiding: true,
        }),
        columnHelperVehicle.accessor("type", {
            header: () => <span>type</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: true,
            enableSorting: true,
            enableHiding: false,
        }),
        columnHelperVehicle.accessor("kilometrage", {
            header: () => <span>kilometrage</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: true,
            enableSorting: true,
            enableHiding: true,
        }),
        columnHelperVehicle.accessor("piece", {
            header: () => <span>Statut dispo</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: true,
            enableSorting: true,
            enableHiding: true,
        }),
        columnHelperVehicle.accessor("dateEnd", {
            header: () => <span>Date Fin</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: true,
            enableSorting: true,
            enableHiding: true,
        }),
        columnHelperVehicle.accessor("amount", {
            header: () => <span>cout d'Intervention</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: true,
            enableSorting: true,
            enableHiding: true,
        }),
    ];
    return (
        <>
            <DatePicker onChange={onChangeDatePicker} />
            <Table
                data={dataVehicleInterventions}
                columns={columns}
                isCanHiddenColumn
                onSearch={(e: any) => console.log(e)}
                onFilter={(e: any) => console.log(e)}
                onGetValue={(e: any) => console.log(e)}
                addFormContent={
                    <div>
                        <p>Add form content </p>
                    </div>
                }
            // onSearchByColumn={(e : any) => console.log()}
            />
            <div className="w-full flex justify-end bg-[#D9D9D9] py-[20px]">
                <div className="flex w-[658px]">
                    <div className="flex-1">Total Intervention</div>
                    <div className="flex-1">12000000</div>
                </div>
            </div>
        </>
    )
}