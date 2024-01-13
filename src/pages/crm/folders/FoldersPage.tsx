import { Folder } from "@/entities/crm/folders/Folders";
import { fetchAllFolders } from "@/features/crm/folders/actions";

import {
  useFoldersData,
  useFoldersIsLoading,
  useFoldersPagination,
  useFoldersRequests,
} from "@/features/crm/folders/lib";

import Table from "@/widgets/components/table/Table";
import { AddFolders } from "@/widgets/crm/folders/addFolders";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaFlag } from "react-icons/fa";
import dayjs from "dayjs";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { Loader } from "@/shared/ui/loader/Loader";

export const FoldersPage = () => {
  const dispatch: any = useDispatch();
  const foldersRequests = useFoldersRequests();
  const foldersPagination = useFoldersPagination();
  const allAverageCosts: Folder[] = useFoldersData();
  const isLoading = useFoldersIsLoading();
  const [, setSelected] = useState<any>(null);

  const columnHelperFolder = createColumnHelper<Folder>();

  useEffect(() => {
    dispatch(fetchAllFolders(foldersRequests));
  }, []);

  const handleChangeRequest = (e: any) => {
    dispatch(fetchAllFolders({ ...foldersRequests, ...e }));
  };

  const dataFolders: Folder[] = allAverageCosts;

  const handleSuccess = () => {
    dispatch(fetchAllFolders({ ...foldersRequests }));
    dispatch(ActionReducer.setShowDrawer(false));
  };

  const renderPriority = (state: "urgent" | "high" | "normal" | "low") => {
    const urgentColor = {
      color: "#E31C23",
    };
    const highColor = {
      color: "#FFCC01",
    };
    const normalColor = {
      color: "#70DDFF",
    };
    const lowColor = {
      color: "#D8D8D8",
    };
    switch (state) {
      case "urgent":
        return <FaFlag style={urgentColor} />;
      case "high":
        return <FaFlag style={highColor} />;
      case "normal":
        return <FaFlag style={normalColor} />;
      case "low":
        return <FaFlag style={lowColor} />;
      default:
        return;
    }
  };

  const columns: ColumnDef<Folder, any>[] = [
    columnHelperFolder.accessor("name", {
      header: () => <span>Nom de dossier</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelperFolder.accessor("projectHolder.firstname", {
      header: () => <span>Charge de dossier</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelperFolder.accessor(
      "customer.customerIdentification.customerTitle",
      {
        header: () => <span>client</span>,
        cell: (props) => props.getValue(),
        enableColumnFilter: true,
        enableSorting: true,
        enableHiding: false,
      }
    ),
    columnHelperFolder.accessor("priority", {
      header: () => <span>priority</span>,
      cell: (props) => renderPriority(props.getValue()),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelperFolder.accessor("deliverydate", {
      header: () => <span>Date de livraison</span>,
      cell: (props) => dayjs(props.getValue()).format("DD/MM/YYYY"),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: false,
    }),
  ];

  return (
    <>
      <Loader isLoading={isLoading} />
      <Table
        title="Dossiers"
        data={dataFolders}
        tableTitle="Listes des dossiers"
        isCanClickOnRow={false}
        columns={columns}
        isCanHiddenColumn
        drawerWidth={1400}
        isEnableAdd
        isCanEdit
        onChangePage={handleChangeRequest}
        onSearch={(e: any) => console.log(e)}
        onFilter={(e: any) => console.log(e)}
        onGetValue={(e: any) => {
          setSelected((prev: any) => ({
            ...prev,
            ...e,
            ...{
              name: e?.name,
              projectHolder: { id: e?.projectHolder?.id },
              beginDate: dayjs(e?.startDate),
              deliverydate: dayjs(e?.deliverydate),
            },
          }));
        }}
        addFormContent={<AddFolders onSuccess={handleSuccess} />}
        editFornContent={<AddFolders onSuccess={handleSuccess} />}
        pagination={{
          defaultCurrentPage: foldersPagination?.current || 1,
          itemsPerPage: foldersPagination?.itemsPerPage || 10,
          totalItems: foldersPagination?.totalItems || 0,
        }}
      />
    </>
  );
};
