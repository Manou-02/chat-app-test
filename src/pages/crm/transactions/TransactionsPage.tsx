import { AppDispatch } from "@/app/appStore";
import { PaginationType } from "@/entities/pagination/Pagination";
import { fetchAllTransactions } from "@/features/crm/transactions/actions";
import { TransactionsConstants } from "@/features/crm/transactions/constants";
import {
  useTransactionData,
  useTransactionIsLoading,
  useTransactionPagination,
  useTransactionRequest,
} from "@/features/crm/transactions/lib";
import { Loader } from "@/shared/ui/loader/Loader";
import { renderPriority } from "@/shared/utils/flag";
import Table from "@/widgets/components/table/Table";
import { TransactionsForm } from "@/widgets/crm/transactions/TransactionsForm";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const TransactionPage = () => {
  const columnHelperUsers = createColumnHelper<any>();
  const dispatch: AppDispatch = useDispatch();

  const transactionsData = useTransactionData();
  const isLoadingTransaction = useTransactionIsLoading();
  const transactionRequest = useTransactionRequest();
  const transactionPagination: PaginationType = useTransactionPagination();

  const [selectedValue, setSelectedValue] = useState<any | undefined>();

  const columns: ColumnDef<any, any>[] = [
    // columnHelperUsers.accessor("id", {
    //   header: () => <span>Numero</span>,
    //   cell: (props) => props.getValue(),
    //   enableColumnFilter: false,
    //   enableSorting: true,
    //   enableHiding: true,
    // }),
    columnHelperUsers.accessor("name", {
      header: () => <span>Nom transaction</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("folderTransaction.folder.name", {
      header: () => <span>Dossier</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("responsibleBusiness.firstname", {
      header: () => <span>Chargé de dossier</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("accountCode", {
      header: () => <span>Code affaire</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor(
      "folderTransaction.folder.customer.customerIdentification.customerTitle",
      {
        header: () => <span>Client</span>,
        cell: (props) => props.getValue(),
        enableColumnFilter: true,
        enableSorting: true,
        enableHiding: true,
      }
    ),
    columnHelperUsers.accessor("department.name", {
      header: () => <span>Département</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("priority", {
      header: () => <span>Priorité</span>,
      cell: (props) => renderPriority(props.getValue()),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("folderTransaction.folder.deliverydate", {
      header: () => <span>Date de livraison</span>,
      cell: (props) => dayjs(props.getValue()).format("DD/MM/YYYY"),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("status", {
      header: () => <span>Statut</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllTransactions(transactionRequest));
  }, []);

  const handleSetRequest = (e: any) => {
    dispatch(fetchAllTransactions({ ...transactionRequest, ...e }));
  };

  const handleOnGetValue = (e: any) => {
    setSelectedValue(e);
  };

  const handleSuccess = () => {
    dispatch(fetchAllTransactions(transactionRequest));
  };

  return (
    <>
      <Loader isLoading={isLoadingTransaction} />
      <Table
        title="Transaction"
        tableTitle="Liste"
        data={transactionsData}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        // isCanShow
        // isCanEdit
        // isCanDelete
        ressource={TransactionsConstants.TRANSACTIONS}
        addFormContent={
          <TransactionsForm handleSuccess={handleSuccess} selected={null} />
        }
        editFornContent={
          <TransactionsForm
            handleSuccess={handleSuccess}
            selected={selectedValue}
          />
        }
        onLoad={handleSuccess}
        onSearch={handleSetRequest}
        onFilter={handleSetRequest}
        onGetValue={handleOnGetValue}
        pagination={{
          defaultCurrentPage: transactionPagination?.current || 1,
          itemsPerPage: transactionPagination?.itemsPerPage || 10,
          totalItems: transactionPagination?.totalItems || 0,
        }}
      />
    </>
  );
};
