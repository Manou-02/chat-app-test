import { FC, useState, useEffect } from "react";
import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";
import {
  useBanksData,
  useBanksLoader,
  useBanksPagination,
  useBanksRequest,
} from "@/features/setting/bank/lib";
import { PaginationType } from "@/entities/pagination/Pagination";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { fetchAllBanks } from "@/features/setting/bank/actions";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { BankConstant } from "@/features/setting/bank/constants";
import { BanksForm } from "@/widgets/setting/banks/BanksForm";

export const BanksPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const bansksData = useBanksData();
  const banksPagination: PaginationType = useBanksPagination();
  const banksRequest = useBanksRequest();
  const isLoadingBanks = useBanksLoader();

  const columnHelperUsers = createColumnHelper<any>();

  const [, setSelectedValue] = useState<any>();

  const columns: ColumnDef<any, any>[] = [
    columnHelperUsers.accessor("entitled", {
      header: () => <span>Banque</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("abbreviation", {
      header: () => <span>Abbréviation</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("phone", {
      header: () => <span>Téléphone</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllBanks(banksRequest));
  }, []);

  const handleSetRequest = (e: any) => {
    dispatch(fetchAllBanks({ ...banksRequest, ...e }));
  };

  const handleOnGetValue = (e: any) => {
    setSelectedValue(e);
  };

  const handleSuccess = () => {
    dispatch(fetchAllBanks(banksRequest));
  };

  return (
    <>
      <Loader isLoading={isLoadingBanks} />
      <Table
        title="Banques"
        tableTitle="Liste"
        data={bansksData}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        isCanEdit
        isCanDelete
        ressource={BankConstant.BANK}
        addFormContent={<BanksForm onSuccess={handleSuccess} />}
        editFornContent={<BanksForm onSuccess={handleSuccess} />}
        onLoad={handleSuccess}
        onSearch={handleSetRequest}
        onFilter={handleSetRequest}
        onGetValue={handleOnGetValue}
        pagination={{
          defaultCurrentPage: banksPagination?.current | 1,
          itemsPerPage: banksPagination?.itemsPerPage | 10,
          totalItems: banksPagination?.totalItems,
        }}
      />
    </>
  );
};
