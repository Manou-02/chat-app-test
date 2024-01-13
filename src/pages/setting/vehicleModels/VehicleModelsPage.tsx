import { VehicleModel } from "@/entities/setting/vehicleModels/VehicleModels";
import { fetchAllvehicleModels } from "@/features/flotte/vehicleModels/actions";
import { useVehicleModelsData, useVehicleModelsIsLoading, useVehicleModelsPagination, useVehicleModelsRequests } from "@/features/flotte/vehicleModels/lib";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { AddVehicleModels } from "@/widgets/setting/vehicleModels/addVehicleModels";
import { EditVehicleModels } from "@/widgets/setting/vehicleModels/editVehicleModels";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const VehicleModelsPage = () => {
    const dispatch: any = useDispatch();
    const vehicleModelsRequests = useVehicleModelsRequests();
    const vehicleModelsPagination = useVehicleModelsPagination();
    const allvehicleModels: VehicleModel[] = useVehicleModelsData();
    const [selected, setSelected] = useState<any>(null);
    const isLoadingVehicleModel = useVehicleModelsIsLoading();

    const columnHelperFolder = createColumnHelper<VehicleModel>();

    useEffect(() => {
        dispatch(fetchAllvehicleModels(vehicleModelsRequests));
    }, []);

    const handleChangeRequest = (e: any) => {
        dispatch(fetchAllvehicleModels({ ...vehicleModelsRequests, ...e }));
    };

    const dataVehicleModels: VehicleModel[] = allvehicleModels;


    const handleSuccess = () => {
        dispatch(fetchAllvehicleModels({ ...vehicleModelsRequests }));
        dispatch(ActionReducer.setShowDrawer(false));
    };


    const columns: ColumnDef<VehicleModel, any>[] = [
        columnHelperFolder.accessor("vehicleBrand.name", {
            header: () => <span>Marque</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: true,
            enableSorting: true,
            enableHiding: false,
        }),
        columnHelperFolder.accessor("name", {
            header: () => <span>Modèle</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: true,
            enableSorting: true,
            enableHiding: false,
        }),
    ];
    return (
        <>
            <Loader isLoading={isLoadingVehicleModel} />
            <Table
                title="Modèle de véhicule"
                data={dataVehicleModels}
                tableTitle="Liste des modèles de véhicule"
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
                    setSelected({
                        ...e, ...{
                            vehicleBrand: e?.vehicleBrand?.id
                        }
                    });
                }}
                addFormContent={
                    <AddVehicleModels onSuccess={handleSuccess} />
                }
                editFornContent={
                    <EditVehicleModels onSuccess={handleSuccess} selected={selected} />
                }
                pagination={{
                    defaultCurrentPage: vehicleModelsPagination?.current || 1,
                    itemsPerPage: vehicleModelsPagination?.itemsPerPage || 10,
                    totalItems: vehicleModelsPagination?.totalItems || 0,
                }}

            // onSearchByColumn={(e : any) => console.log()}
            />
        </>
    )
}