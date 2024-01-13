import { ContainerType } from "@/entities/setting/containerTypes/ContainerTypes";
import { fetchAllContainerTypes } from "@/features/setting/containerTypes/actions";
import {
  useContainerTypesData,
  useContainerTypesPagination,
  useContainerTypesRequests,
} from "@/features/setting/containerTypes/lib";
import Table from "@/widgets/components/table/Table";
import { AddContainerTypes } from "@/widgets/setting/containerTypes/addContainerTypes";
import { EditContainerTypes } from "@/widgets/setting/containerTypes/editContainerTypes";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const ContainerTypesPage = () => {
  const dispatch: any = useDispatch();
  const containerTypesRequests = useContainerTypesRequests();
  const containerTypesPagination = useContainerTypesPagination();
  const allContainerTypes = useContainerTypesData();
  const [selected, setSelected] = useState<any>(null);

  const columnHelperContainerType = createColumnHelper<ContainerType>();

  useEffect(() => {
    dispatch(fetchAllContainerTypes(containerTypesRequests));
  }, []);

  const handleChangeRequest = (e: any) => {
    dispatch(fetchAllContainerTypes({ ...containerTypesRequests, ...e }));
  };

  const dataContainerTypes: ContainerType[] = allContainerTypes;

  const handleSuccess = () => {
    dispatch(fetchAllContainerTypes({ ...containerTypesRequests }));
  };

  const columns: ColumnDef<ContainerType, any>[] = [
    columnHelperContainerType.accessor("unite", {
      header: () => <span>Dimensions</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: false,
    }),
  ];

  return (
    <>
      <Table
        title="Type de conteneur"
        data={dataContainerTypes}
        tableTitle="Listes des type de containers"
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
          setSelected(e);
        }}
        addFormContent={<AddContainerTypes onSuccess={handleSuccess} />}
        editFornContent={
          <EditContainerTypes onSuccess={handleSuccess} selected={selected} />
        }
        pagination={{
          defaultCurrentPage: containerTypesPagination?.current || 1,
          itemsPerPage: containerTypesPagination?.itemsPerPage || 10,
          totalItems: containerTypesPagination?.totalItems || 0,
        }}

        // onSearchByColumn={(e : any) => console.log()}
      />
    </>
  );
};
