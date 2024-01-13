import { fetchAllUsers } from "@/features/users/actions";
import {
  useUsersData,
  useUsersIsLoading,
  useUsersPagination,
  useUsersRequests,
} from "@/features/users/lib";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { UsersEndPoint } from "@/features/users/constants/Constants";
import { UsersForm } from "@/widgets/setting/users/UsersForm";

export const UserPage = () => {
  const dispatch: any = useDispatch();
  const allUsers = useUsersData();
  const isUserLoading = useUsersIsLoading();
  const pagination = useUsersPagination();
  const usersRequests = useUsersRequests();

  const [, setValue] = useState<any>(null);
  const [, setSearchValue] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchAllUsers({ ...usersRequests }));
  }, []);

  const columnHelperUsers = createColumnHelper<any>();

  const columns: ColumnDef<any, any>[] = [
    columnHelperUsers.accessor("firstname", {
      header: () => <span>Nom</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("lastname", {
      header: () => <span>Prénom</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("email", {
      header: () => <span>Email</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  const handleSuccess = () => {
    dispatch(fetchAllUsers({ ...usersRequests }));
  };

  const handleSearch = (e: any) => {
    setSearchValue(e);
    dispatch(fetchAllUsers(e));
  };

  const handleFilter = (e: any) => {
    dispatch(fetchAllUsers({ ...usersRequests, ...e }));
  };

  return (
    <>
      <Loader isLoading={isUserLoading} />
      <Table
        title="Utilisateurs"
        tableTitle="Liste des utilisateurs"
        data={allUsers}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        isCanEdit
        isCanDelete
        drawerWidth={1400}
        // isCanShow
        onLoad={handleSuccess}
        ressource={UsersEndPoint.USER}
        addFormContent={<UsersForm handleSuccess={handleSuccess} />}
        editFornContent={<UsersForm handleSuccess={handleSuccess} />}
        onSearch={(e: any) => handleSearch(e)}
        onFilter={(e: any) => handleFilter(e)}
        onGetValue={(e: any) => setValue(e)}
        pagination={pagination}
      />
    </>
  );
};
