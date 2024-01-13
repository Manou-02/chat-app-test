import { FC, useState, useEffect } from "react";
import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";
import {
  useQualityData,
  useQualityLoading,
  useQualityPagination,
  useQualityRequest,
} from "@/features/setting/quality/lib";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { fetchAllQuality } from "@/features/setting/quality/actions/idex";
import { QualityConstants } from "@/features/setting/quality/constants";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
import { QualityForm } from "@/widgets/setting/quality/QualityForm";

type QualityType = {
  id?: number;
  name?: string;
};

export const QualityPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const qualityData = useQualityData();
  const isLoadingQuality = useQualityLoading();
  const qualityRequest = useQualityRequest();
  const qualityPagination = useQualityPagination();

  const columnHelperUsers = createColumnHelper<QualityType>();

  const [selectedValue, setSelectedValue] = useState<QualityType | undefined>();

  const columns: ColumnDef<any, any>[] = [

    columnHelperUsers.accessor("label", {
      header: () => <span>Libellé</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllQuality(qualityRequest));
  }, []);

  const handleSetRequest = (e: any) => {
    dispatch(fetchAllQuality({ ...qualityRequest, ...e }));
  };

  const handleOnGetValue = (e: QualityType) => {
    setSelectedValue(e);
  };

  const handleSuccess = () => {
    dispatch(fetchAllQuality(qualityRequest));
  };

  return (
    <>
      <Loader isLoading={isLoadingQuality} />
      <Table
        title="Qualités"
        tableTitle="Liste"
        data={qualityData}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        isCanEdit
        isCanDelete
        ressource={QualityConstants.QUALITY}
        addFormContent={
          <QualityForm handleSuccess={handleSuccess} selected={null} />
        }
        editFornContent={
          <QualityForm handleSuccess={handleSuccess} selected={selectedValue} />
        }
        onLoad={handleSuccess}
        onSearch={handleSetRequest}
        onFilter={handleSetRequest}
        onGetValue={handleOnGetValue}
        pagination={{
          defaultCurrentPage: qualityPagination?.current | 1,
          itemsPerPage: qualityPagination?.itemsPerPage | 10,
          totalItems: qualityPagination?.totalItems,
        }}
      />
    </>
  );
};
