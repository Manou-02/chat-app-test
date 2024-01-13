import { FC, useState, useEffect } from "react";
import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";
import {
  useOtherCostData,
  useOtherCostIsLoading,
  useOtherCostPagination,
  useOtherCostRequest,
} from "@/features/setting/otherCost/lib";
import { PaginationType } from "@/entities/pagination/Pagination";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { fetchAllOtherCosts } from "@/features/setting/otherCost/actions";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { OtherCostConstants } from "@/features/setting/otherCost/constants";
import { OtherCostForm } from "@/widgets/setting/otherCosts/OtherCostForm";

type OtherCostType = {
  id?: number;
  label?: string;
  averageCost?: {
    id?: number;
    name?: string;
    cost?: number;
  };
  resalePrice?: number;
};

export const OtherCostPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const otherCostData = useOtherCostData();
  const otherCostRequest = useOtherCostRequest();
  const otherCostPagination: PaginationType = useOtherCostPagination();
  const isLoadingOtherCost = useOtherCostIsLoading();

  const columnHelperUsers = createColumnHelper<OtherCostType>();

  const [selectedValue, setSelectedValue] = useState<
    OtherCostType | undefined
  >();

  const columns: ColumnDef<OtherCostType, any>[] = [
    columnHelperUsers.accessor("id", {
      header: () => <span>Numero</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("label", {
      header: () => <span>Libellé</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("averageCost.cost", {
      header: () => <span>Coût moyen</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("resalePrice", {
      header: () => <span>Prix de revente</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllOtherCosts(otherCostRequest));
  }, []);

  const handleSetRequest = (e: any) => {
    dispatch(fetchAllOtherCosts({ ...otherCostRequest, ...e }));
  };

  const handleOnGetValue = (e: OtherCostType) => {
    setSelectedValue(e);
  };

  const handleSuccess = () => {
    dispatch(fetchAllOtherCosts(otherCostRequest));
  };

  return (
    <>
      <Loader isLoading={isLoadingOtherCost} />
      <Table
        title="Autres frais"
        tableTitle="Liste"
        data={otherCostData}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        isCanEdit
        isCanDelete
        ressource={OtherCostConstants.OTHER_COST}
        addFormContent={
          <OtherCostForm handleSuccess={handleSuccess} selected={null} />
        }
        editFornContent={
          <OtherCostForm
            handleSuccess={handleSuccess}
            selected={selectedValue}
          />
        }
        onLoad={handleSuccess}
        onSearch={handleSetRequest}
        onFilter={handleSetRequest}
        onGetValue={handleOnGetValue}
        pagination={{
          defaultCurrentPage: otherCostPagination?.current | 1,
          itemsPerPage: otherCostPagination?.itemsPerPage | 10,
          totalItems: otherCostPagination?.totalItems,
        }}
      />
    </>
  );
};
