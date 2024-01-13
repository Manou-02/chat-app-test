import { ShippingCompany } from "@/entities/setting/shippingCompanies/ShippingCompanies";
import { fetchAllShippingCompanies } from "@/features/setting/shippingCompanies/actions";
import { useShippingCompaniesData, useShippingCompaniesIsLoading, useShippingCompaniesPagination, useShippingCompaniesRequests } from "@/features/setting/shippingCompanies/lib";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { AddShippingCompanies } from "@/widgets/setting/shippingComapanies/addShippingCompanies";
import { EditShippingCompanies } from "@/widgets/setting/shippingComapanies/editShippingCompanies/EditShippingCompanies";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const ShippingCompaniesPage = () => {

    const dispatch: any = useDispatch();
    const shippingCompaniesRequests = useShippingCompaniesRequests();
    const shippingCompaniesPagination = useShippingCompaniesPagination();
    const allShippingCompanies: ShippingCompany[] = useShippingCompaniesData();
    const [selected, setSelected] = useState<any>(null);
    const isLoadingShippingCompanies = useShippingCompaniesIsLoading();

    const columnHelperShippingCompany = createColumnHelper<ShippingCompany>();


    useEffect(() => {
        dispatch(fetchAllShippingCompanies(shippingCompaniesRequests));
    }, []);

    const handleChangeRequest = (e: any) => {
        dispatch(fetchAllShippingCompanies({ ...shippingCompaniesRequests, ...e }));
    };


    const handleSuccess = () => {
        dispatch(fetchAllShippingCompanies({ ...shippingCompaniesRequests }));
        dispatch(ActionReducer.setShowDrawer(false));
    }

    const columns: ColumnDef<ShippingCompany, any>[] = [
        columnHelperShippingCompany.accessor("name", {
            header: () => <span>Companie</span>,
            cell: (props) => props.getValue(),
            enableColumnFilter: true,
            enableSorting: true,
            enableHiding: false,
        }),
    ];


    return (
        <>
            <Loader isLoading={isLoadingShippingCompanies} />
            <Table
                title="Compagnie maritime"
                data={allShippingCompanies}
                tableTitle="Listes des compagnies maritimes"
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
                    <AddShippingCompanies onSuccess={handleSuccess} />
                }
                editFornContent={
                    <EditShippingCompanies onSuccess={handleSuccess} selected={selected} />
                }
                pagination={{
                    defaultCurrentPage: shippingCompaniesPagination?.current || 1,
                    itemsPerPage: shippingCompaniesPagination?.itemsPerPage || 10,
                    totalItems: shippingCompaniesPagination?.totalItems || 0,
                }}

            // onSearchByColumn={(e : any) => console.log()}
            /></>
    )
}