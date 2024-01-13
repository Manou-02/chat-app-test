import { AppDispatch } from "@/app/appStore";
import { PaginationType } from "@/entities/pagination/Pagination";
import { fetchAllProvider } from "@/features/setting/provider/actions";
import { ProviderConstants } from "@/features/setting/provider/constants";
import {
  useProviderData,
  useProviderIsLoading,
  useProviderPagination,
  useProviderRequest,
} from "@/features/setting/provider/lib";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { ProviderForm } from "@/widgets/setting/provider/ProviderForm";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

type ProviderType = {
  id?: number;
  name?: string;
};

export const ProviderPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const providerData = useProviderData();
  const providerRequest = useProviderRequest();
  const providerIsLoading = useProviderIsLoading();
  const providerPagination: PaginationType = useProviderPagination();

  const columnHelperUsers = createColumnHelper<ProviderType>();

  const [selectedValue, setSelectedValue] = useState<
    ProviderType | undefined
  >();

  const columns: ColumnDef<ProviderType, any>[] = [
    columnHelperUsers.accessor("name", {
      header: () => <span>Type</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllProvider(providerRequest));
  }, []);

  const handleSetRequest = (e: any) => {
    dispatch(fetchAllProvider({ ...providerRequest, ...e }));
  };

  const handleOnGetValue = (e: ProviderType) => {
    setSelectedValue(e);
  };

  const handleSuccess = () => {
    dispatch(fetchAllProvider(providerRequest));
  };

  return (
    <>
      <Loader isLoading={providerIsLoading} />
      <Table
        title="Type de fournisseur"
        tableTitle="Liste"
        data={providerData}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        isCanEdit
        isCanDelete
        ressource={ProviderConstants.PROVIDER}
        addFormContent={
          <ProviderForm handleSuccess={handleSuccess} selected={null} />
        }
        editFornContent={
          <ProviderForm
            handleSuccess={handleSuccess}
            selected={selectedValue}
          />
        }
        onLoad={handleSuccess}
        onSearch={handleSetRequest}
        onFilter={handleSetRequest}
        onGetValue={handleOnGetValue}
        pagination={{
          defaultCurrentPage: providerPagination?.current | 1,
          itemsPerPage: providerPagination?.itemsPerPage | 10,
          totalItems: providerPagination?.totalItems,
        }}
      />
    </>
  );
};
