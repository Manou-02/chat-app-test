import { FC, useState, useEffect } from "react";
import { AppDispatch } from "@/app/appStore";
import {
  useCustomerTypeData,
  useCustomerTypeIsLoading,
  useCustomerTypePagination,
  useCustomerTypeRequest,
} from "@/features/setting/customerType/lib";
import { useDispatch } from "react-redux";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { fetchAllCustomerType } from "@/features/setting/customerType/actions";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { CustomerTypeConstants } from "@/features/setting/customerType/constants";
import { PaginationType } from "@/entities/pagination/Pagination";
import { CustomerTypeForm } from "@/widgets/setting/customerType/CustomerTypeForm";

type CustomersType = {
  id?: number;
  name?: string;
};

export const CustomerTypePage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const customerTypeData = useCustomerTypeData();
  const customerTypeRequest = useCustomerTypeRequest();
  const customerTypeIsLoading = useCustomerTypeIsLoading();
  const customerTypePagination: PaginationType = useCustomerTypePagination();

  const columnHelperUsers = createColumnHelper<CustomersType>();

  const [selectedValue, setSelectedValue] = useState<
    CustomersType | undefined
  >();

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
    dispatch(fetchAllCustomerType(customerTypeRequest));
  }, []);

  const handleSetRequest = (e: any) => {
    dispatch(fetchAllCustomerType({ ...customerTypeRequest, ...e }));
  };

  const handleOnGetValue = (e: CustomersType) => {
    setSelectedValue(e);
  };

  const handleSuccess = () => {
    dispatch(fetchAllCustomerType(customerTypeRequest));
  };

  return (
    <>
      <Loader isLoading={customerTypeIsLoading} />
      <Table
        title="Type de client"
        tableTitle="Liste"
        data={customerTypeData}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        isCanEdit
        isCanDelete
        ressource={CustomerTypeConstants.CUSTOMER_TYPE}
        addFormContent={
          <CustomerTypeForm handleSuccess={handleSuccess} selected={null} />
        }
        editFornContent={
          <CustomerTypeForm
            handleSuccess={handleSuccess}
            selected={selectedValue}
          />
        }
        onLoad={handleSuccess}
        onSearch={handleSetRequest}
        onFilter={handleSetRequest}
        onGetValue={handleOnGetValue}
        pagination={{
          defaultCurrentPage: customerTypePagination?.current | 1,
          itemsPerPage: customerTypePagination?.itemsPerPage | 10,
          totalItems: customerTypePagination?.totalItems,
        }}
      />
    </>
  );
};
