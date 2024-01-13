import { VehicleBrand } from "@/entities/setting/vehicleBrands/VehicleBrands";
import { fetchAllvehicleBrands } from "@/features/flotte/vehicleBrands/actions";
import { useVehicleBrandsData, useVehicleBrandsIsLoading, useVehicleBrandsPagination, useVehicleBrandsRequests } from "@/features/flotte/vehicleBrands/lib";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { AddVehicleBrands } from "@/widgets/setting/vehicleBrands/addVehicleBrands";
import { EditVehicleBrands } from "@/widgets/setting/vehicleBrands/editVehicleBrands";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const VehicleBrandsPage = () => {
    const dispatch: any = useDispatch();
    const vehicleBrandsRequests = useVehicleBrandsRequests();
    const vehicleBrandsPagination = useVehicleBrandsPagination();
    const allvehicleBrands: VehicleBrand[] = useVehicleBrandsData();
    const [selected, setSelected] = useState<any>(null);
    const isLoadingVehicleBrand = useVehicleBrandsIsLoading();

    const columnHelperFolder = createColumnHelper<VehicleBrand>();


    useEffect(() => {
        dispatch(fetchAllvehicleBrands(vehicleBrandsRequests));
    }, []);

    const handleChangeRequest = (e: any) => {
        dispatch(fetchAllvehicleBrands({ ...vehicleBrandsRequests, ...e }));
    };

    const dataVehicleBrands: VehicleBrand[] = allvehicleBrands;

    const handleSuccess = () => {
        dispatch(fetchAllvehicleBrands({ ...vehicleBrandsRequests }));
        dispatch(ActionReducer.setShowDrawer(false));
    };

    const columns: ColumnDef<VehicleBrand, any>[] = [
        columnHelperFolder.accessor("name", {
            header: () => <span>Marque</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: true,
            enableSorting: true,
            enableHiding: false,
        }),
    ];

    return (
        <>
            <Loader isLoading={isLoadingVehicleBrand} />
            <Table
                title="Marque de véhicule"
                data={dataVehicleBrands}
                tableTitle="Liste des marques de véhicule"
                isCanClickOnRow={false}
                columns={columns}
                isCanHiddenColumn
                drawerWidth={1400}
                isEnableAdd
                isCanEdit
                onChangePage={handleChangeRequest}
                onSearch={(e: any) => console.log(e)}
                onFilter={(e: any) => console.log(e)}
                onGetValue={(e: any) => {
                    console.log("E ", e);
                    setSelected(e);
                }}
                addFormContent={
                    <AddVehicleBrands onSuccess={handleSuccess} />
                }
                editFornContent={
                    <EditVehicleBrands onSuccess={handleSuccess} selected={selected} />
                }
                pagination={{
                    defaultCurrentPage: vehicleBrandsPagination?.current || 1,
                    itemsPerPage: vehicleBrandsPagination?.itemsPerPage || 10,
                    totalItems: vehicleBrandsPagination?.totalItems || 0,
                }}

            // onSearchByColumn={(e : any) => console.log()}
            /></>
    )
}