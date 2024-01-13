import { AppDispatch } from "@/app/appStore";
import {
  useCentersData,
  useCentersIsLoading,
  useCentersPagination,
  useCentersRequest,
} from "@/features/setting/centers/lib";
import { useDispatch } from "react-redux";
import { FC, useState, useEffect } from "react";
import { fetchAllCenters } from "@/features/setting/centers/actions";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { CenterContants } from "@/features/setting/centers/contants";
import { PaginationType } from "@/entities/pagination/Pagination";
import { CentersForm } from "@/widgets/setting/centers/CentersForm";

type CentersType = {
  id?: number;
  name?: string;
};

export const CentersPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const centersData = useCentersData();
  const centersRequest = useCentersRequest();
  const centersIsLoading = useCentersIsLoading();
  const centersPagination: PaginationType = useCentersPagination();

  const columnHelperUsers = createColumnHelper<CentersType>();

  const [selectedValue, setSelectedValue] = useState<CentersType | undefined>();

  const columns: ColumnDef<any, any>[] = [
    columnHelperUsers.accessor("name", {
      header: () => <span>Nom du centre</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllCenters(centersRequest));
  }, []);

  const handleSetRequest = (e: any) => {
    dispatch(fetchAllCenters({ ...centersRequest, ...e }));
  };

  const handleOnGetValue = (e: CentersType) => {
    setSelectedValue(e);
  };

  const handleSuccess = () => {
    dispatch(fetchAllCenters(centersRequest));
  };

  return (
    <>
      <Loader isLoading={centersIsLoading} />
      <Table
        title="Centres"
        tableTitle="Liste"
        data={centersData}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        isCanEdit
        isCanDelete
        ressource={CenterContants.CENTERS}
        addFormContent={
          <CentersForm handleSuccess={handleSuccess} selected={null} />
        }
        editFornContent={
          <CentersForm handleSuccess={handleSuccess} selected={selectedValue} />
        }
        onLoad={handleSuccess}
        onSearch={handleSetRequest}
        onFilter={handleSetRequest}
        onGetValue={handleOnGetValue}
        pagination={{
          defaultCurrentPage: centersPagination?.current | 1,
          itemsPerPage: centersPagination?.itemsPerPage | 10,
          totalItems: centersPagination?.totalItems,
        }}
      />
    </>
  );
};
