import { FC, useState, useEffect } from "react";
import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";
import {
  useServiceTypeData,
  useServiceTypeIsLoading,
  useServiceTypePagination,
  useServiceTypeRequest,
} from "@/features/setting/serviceType/lib";
import { PaginationType } from "@/entities/pagination/Pagination";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { fetchAllServiceType } from "@/features/setting/serviceType/actions";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { ServiceTypeConstant } from "@/features/setting/serviceType/constants";
import { ServicesTypeForm } from "@/widgets/setting/servicesType/ServicesTypeForm";

type ServicesType = {
  id?: number;
  name?: string;
};

export const ServicesType: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const serviceTypeData = useServiceTypeData();
  const serviceTypePagination: PaginationType = useServiceTypePagination();
  const serviceTypeIsLoading = useServiceTypeIsLoading();
  const serviceTypeRequest = useServiceTypeRequest();

  const [selectedValue, setSelectedValue] = useState<
    ServicesType | undefined
  >();
  const columnHelperUsers = createColumnHelper<ServicesType>();

  const columns: ColumnDef<any, any>[] = [
    columnHelperUsers.accessor("name", {
      header: () => <span>Type</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllServiceType(serviceTypeRequest));
  }, []);

  const handleSetRequest = (e: any) => {
    dispatch(fetchAllServiceType({ ...serviceTypeRequest, ...e }));
  };

  const handleOnGetValue = (e: ServicesType) => {
    setSelectedValue(e);
  };

  const handleSuccess = () => {
    dispatch(fetchAllServiceType(serviceTypeRequest));
  };

  return (
    <>
      <Loader isLoading={serviceTypeIsLoading} />
      <Table
        title="Type de services"
        tableTitle="Liste des types de service"
        data={serviceTypeData}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        isCanEdit
        isCanDelete
        ressource={ServiceTypeConstant.SERVICE_TYPE}
        addFormContent={
          <ServicesTypeForm handleSuccess={handleSuccess} selected={null} />
        }
        editFornContent={
          <ServicesTypeForm
            handleSuccess={handleSuccess}
            selected={selectedValue}
          />
        }
        onLoad={handleSuccess}
        onSearch={handleSetRequest}
        onFilter={handleSetRequest}
        onGetValue={handleOnGetValue}
        pagination={{
          defaultCurrentPage: serviceTypePagination?.current | 1,
          itemsPerPage: serviceTypePagination?.itemsPerPage | 10,
          totalItems: serviceTypePagination?.totalItems,
        }}
      />
    </>
  );
};
