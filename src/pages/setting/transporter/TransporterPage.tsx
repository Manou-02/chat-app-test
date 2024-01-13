import { FC, useState, useEffect } from "react";
import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";
import {
  useTransporterData,
  useTransporterIsLoading,
  useTransporterPagination,
  useTransporterRequest,
} from "@/features/setting/transporters/lib";
import { PaginationType } from "@/entities/pagination/Pagination";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { fetchAllTransporters } from "@/features/setting/transporters/actions";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { TransporterConstant } from "@/features/setting/transporters/constants";
import { TransporterForm } from "@/widgets/setting/transporters/TransporterForm";

type TransporterType = {
  id?: number;
  name?: string;
};

export const TransporterPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const transporterData = useTransporterData();
  const isLoadingTransporter = useTransporterIsLoading();
  const transporterPagination: PaginationType = useTransporterPagination();
  const transporterRequest = useTransporterRequest();

  const columnHelperUsers = createColumnHelper<TransporterType>();

  const [selectedValue, setSelectedValue] = useState<
    TransporterType | undefined
  >();

  const columns: ColumnDef<any, any>[] = [
    columnHelperUsers.accessor("name", {
      header: () => <span>Transporteurs</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllTransporters(transporterRequest));
  }, []);

  const handleSetRequest = (e: any) => {
    dispatch(fetchAllTransporters({ ...transporterRequest, ...e }));
  };

  const handleOnGetValue = (e: TransporterType) => {
    setSelectedValue(e);
  };

  const handleSuccess = () => {
    dispatch(fetchAllTransporters(transporterRequest));
  };

  return (
    <>
      <Loader isLoading={isLoadingTransporter} />
      <Table
        title="Liste des Transporteurs"
        tableTitle="Liste"
        data={transporterData}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        isCanEdit
        isCanDelete
        ressource={TransporterConstant.TRANSPORTER}
        addFormContent={
          <TransporterForm handleSuccess={handleSuccess} selected={null} />
        }
        editFornContent={
          <TransporterForm
            handleSuccess={handleSuccess}
            selected={selectedValue}
          />
        }
        onLoad={handleSuccess}
        onSearch={handleSetRequest}
        onFilter={handleSetRequest}
        onGetValue={handleOnGetValue}
        pagination={{
          defaultCurrentPage: transporterPagination?.current | 1,
          itemsPerPage: transporterPagination?.itemsPerPage | 10,
          totalItems: transporterPagination?.totalItems,
        }}
      />
    </>
  );
};
