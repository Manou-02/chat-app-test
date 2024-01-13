import { AverageCost } from "@/entities/setting/averageCosts/AverageCosts";
import { fetchAllAverageCosts } from "@/features/setting/averageCosts/actions";
import {
  useAverageCostsData,
  useAverageCostsPagination,
  useAverageCostsRequests,
} from "@/features/setting/averageCosts/lib";
import Table from "@/widgets/components/table/Table";
import { AddAverageCosts } from "@/widgets/setting/averageCosts/addAverageCosts";
import { EditAverageCosts } from "@/widgets/setting/averageCosts/editAverageCosts";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const AverageCostsPage = () => {
  const dispatch: any = useDispatch();
  const averageCostsRequests = useAverageCostsRequests();
  const averageCostsPagination = useAverageCostsPagination();
  const allAverageCosts = useAverageCostsData();
  const [selected, setSelected] = useState<any>(null);

  const columnHelperAverageCost = createColumnHelper<AverageCost>();

  useEffect(() => {
    dispatch(fetchAllAverageCosts(averageCostsRequests));
  }, []);

  const handleChangeRequest = (e: any) => {
    dispatch(fetchAllAverageCosts({ ...averageCostsRequests, ...e }));
  };

  const dataAverageCosts: AverageCost[] = allAverageCosts;

  const handleSuccess = () => {
    dispatch(fetchAllAverageCosts({ ...averageCostsRequests }));
  };

  const columns: ColumnDef<AverageCost, any>[] = [
    columnHelperAverageCost.accessor("id", {
      header: () => <span>ID</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      // enableHiding: true,
    }),
    columnHelperAverageCost.accessor("name", {
      header: () => <span>Libelle</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelperAverageCost.accessor("cost", {
      header: () => <span>cout</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: false,
    }),
  ];

  return (
    <>
      <Table
        title="Coût MO"
        data={dataAverageCosts}
        tableTitle="Liste"
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
          setSelected(e);
        }}
        addFormContent={<AddAverageCosts onSuccess={handleSuccess} />}
        editFornContent={
          <EditAverageCosts onSuccess={handleSuccess} selected={selected} />
        }
        pagination={{
          defaultCurrentPage: averageCostsPagination?.current || 1,
          itemsPerPage: averageCostsPagination?.itemsPerPage || 10,
          totalItems: averageCostsPagination?.totalItems || 0,
        }}

        // onSearchByColumn={(e : any) => console.log()}
      />
    </>
  );
};
