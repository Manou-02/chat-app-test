import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useState, useEffect } from "react";
// import { ClientsForm } from "@/widgets/clients/form/ClientsForm";
import {
  useClientsData,
  useClientsIsLoading,
  useClientsPagination,
  useClientsRequests,
} from "@/features/clients/lib";
import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";
import { fetchAllClients } from "@/features/clients/actions";
import { PaginationType } from "@/entities/pagination/Pagination";
import { ClientsConstants } from "@/features/clients/constants/Constants";
import { AddClientsForm } from "@/widgets/clients/form/AddClientsForm";
// import { toast } from "sonner";

// type ClientsTypes = {
//   id: number;
//   refCustomer: string;
//   name: string;
//   firstname: string;
//   customerCompany: string;
//   city: string;
//   adress: string;
//   cin: string;
//   nif: string;
//   nStat: string;
//   telCompta: string;
//   defaultPaymentTerm: string;
//   supplier: true;
//   customerType: {
//     name: string;
//   };
// };

export const ClientsPage = () => {
  const [selectedValue, setSelectedValue] = useState<any>(null);

  const dispatch: AppDispatch = useDispatch();
  const isLoadingClient: any = useClientsIsLoading();
  const clientsRequests = useClientsRequests();
  const clientsData = useClientsData();
  const clientsPagination: PaginationType = useClientsPagination();

  const [isLoading] = useState<boolean>(false);

  const columnHelperUsers = createColumnHelper<any>();

  const columns: ColumnDef<any, any>[] = [
    // columnHelperUsers.accessor("id", {
    //   header: () => <span>Numero</span>,
    //   cell: (props) => props.getValue(),
    //   enableColumnFilter: false,
    //   enableSorting: true,
    //   enableHiding: true,
    // }),
    columnHelperUsers.accessor("refCustomer", {
      header: () => <span>Référence client</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("customerIdentification.customerTitle", {
      header: () => <span>Intitulé client</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("firstname", {
      header: () => <span>Catégorie tarifaire</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("customerIdentification.interlocutor.name", {
      header: () => <span>Intérlocuteur</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("customerIdentification.email", {
      header: () => <span>Email</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("customerIdentification.address", {
      header: () => <span>Adresse</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("customerBank.bank", {
      header: () => <span>Banques</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllClients(clientsRequests));
  }, []);

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);

  const handleSuccess = () => {
    dispatch(fetchAllClients(clientsRequests));
  };
  const handleChangeRequest = (e: any) => {
    dispatch(fetchAllClients({ ...clientsRequests, ...e }));
  };

  return (
    <div>
      <Loader isLoading={isLoading || isLoadingClient} />
      <Table
        title="Clients"
        tableTitle="Liste des clients"
        data={clientsData}
        columns={columns}
        isCanHiddenColumn
        drawerWidth={1400}
        // isDrawerFullScreen
        ressource={ClientsConstants.CLIENTS}
        isEnableAdd
        isCanEdit
        isCanDelete
        // addFormContent={
        //   <ClientsForm onSuccess={handleSuccess} selected={selectedValue} />
        // }
        addFormContent={
          <AddClientsForm selected={null} onSuccess={handleSuccess} />
        }
        editFornContent={
          <AddClientsForm onSuccess={handleSuccess} selected={selectedValue} />
        }
        onSearch={handleChangeRequest}
        onFilter={handleChangeRequest}
        onChangePage={handleChangeRequest}
        onLoad={handleSuccess}
        onGetValue={setSelectedValue}
        // pagination={{
        //   defaultCurrentPage: 3,
        //   totalItems: 100,
        //   itemsPerPage: 10,
        // }}
        pagination={{
          defaultCurrentPage: clientsPagination?.current || 1,
          itemsPerPage: clientsPagination?.itemsPerPage || 10,
          totalItems: clientsPagination?.totalItems || 0,
        }}
      />
    </div>
  );
};
