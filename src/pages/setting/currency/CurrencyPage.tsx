import { FC, useState, useEffect } from "react";
import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";
import {
  useCurrencyData,
  useCurrencyLoading,
  useCurrencyPagination,
  useCurrencyRequest,
} from "@/features/setting/currency/lib";
import { PaginationType } from "@/entities/pagination/Pagination";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { fetchAllCurrencies } from "@/features/setting/currency/actions";
import { CurrencyConstants } from "@/features/setting/currency/constants";
import Table from "@/widgets/components/table/Table";
import { Loader } from "@/shared/ui/loader/Loader";
import { CurrencyForm } from "@/widgets/setting/currency/CurrencyForm";

type CurrencyType = {
  id?: number;
  reference?: string;
};

export const CurrencyPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const currencyData = useCurrencyData();
  const currencyPagination: PaginationType = useCurrencyPagination();
  const currencyRequest = useCurrencyRequest();
  const isLoadingCurrency = useCurrencyLoading();

  const columnHelperUsers = createColumnHelper<CurrencyType>();

  const [selectedValue, setSelectedValue] = useState<
    CurrencyType | undefined
  >();

  const columns: ColumnDef<any, any>[] = [
    columnHelperUsers.accessor("reference", {
      header: () => <span>Référence</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllCurrencies(currencyRequest));
  }, []);

  const handleSetRequest = (e: any) => {
    dispatch(fetchAllCurrencies({ ...currencyRequest, ...e }));
  };

  const handleOnGetValue = (e: CurrencyType) => {
    setSelectedValue(e);
  };

  const handleSuccess = () => {
    dispatch(fetchAllCurrencies(currencyRequest));
  };

  return (
    <>
      <Loader isLoading={isLoadingCurrency} />
      <Table
        title="Dévises"
        tableTitle="Liste"
        data={currencyData}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        isCanEdit
        isCanDelete
        ressource={CurrencyConstants.CURRENCY}
        addFormContent={
          <CurrencyForm handleSuccess={handleSuccess} selected={null} />
        }
        editFornContent={
          <CurrencyForm
            handleSuccess={handleSuccess}
            selected={selectedValue}
          />
        }
        onLoad={handleSuccess}
        onSearch={handleSetRequest}
        onFilter={handleSetRequest}
        onGetValue={handleOnGetValue}
        pagination={{
          defaultCurrentPage: currencyPagination?.current | 1,
          itemsPerPage: currencyPagination?.itemsPerPage | 10,
          totalItems: currencyPagination?.totalItems,
        }}
      />
    </>
  );
};
