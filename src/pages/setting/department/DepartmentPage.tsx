import { FC, useState, useEffect } from "react";
import { AppDispatch } from "@/app/appStore";
import {
  useDepartmentData,
  useDepartmentIsLoading,
  useDepartmentPagination,
  useDepartmentRequest,
} from "@/features/setting/department/lib";
import { useDispatch } from "react-redux";
import { fetchAllDepartment } from "@/features/setting/department/actions";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Loader } from "@/shared/ui/loader/Loader";
import { DepartmentConstant } from "@/features/setting/department/constants";
import Table from "@/widgets/components/table/Table";
import { DepartmentForm } from "@/widgets/setting/department/DepartmentForm";

type DepartmentType = {
  id?: number;
  name?: string;
};

export const DepartmentPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const departmentData = useDepartmentData();
  const isLoadingDepartment = useDepartmentIsLoading();
  const departmentPagination = useDepartmentPagination();
  const departmentRequest = useDepartmentRequest();

  const columnHelperUsers = createColumnHelper<DepartmentType>();

  const [selectedValue, setSelectedValue] = useState<
    DepartmentType | undefined
  >();

  const columns: ColumnDef<any, any>[] = [
    columnHelperUsers.accessor("name", {
      header: () => <span>Nom du département</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllDepartment(departmentRequest));
  }, []);

  const handleSetRequest = (e: any) => {
    dispatch(fetchAllDepartment({ ...departmentRequest, ...e }));
  };

  const handleOnGetValue = (e: DepartmentType) => {
    setSelectedValue(e);
  };

  const handleSuccess = () => {
    dispatch(fetchAllDepartment(departmentRequest));
  };

  return (
    <>
      <Loader isLoading={isLoadingDepartment} />
      <Table
        title="Département"
        tableTitle="Liste"
        data={departmentData}
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        isCanEdit
        isCanDelete
        ressource={DepartmentConstant.DEPARTMENT}
        addFormContent={
          <DepartmentForm handleSuccess={handleSuccess} selected={null} />
        }
        editFornContent={
          <DepartmentForm
            handleSuccess={handleSuccess}
            selected={selectedValue}
          />
        }
        onLoad={handleSuccess}
        onSearch={handleSetRequest}
        onFilter={handleSetRequest}
        onGetValue={handleOnGetValue}
        pagination={{
          defaultCurrentPage: departmentPagination?.current | 1,
          itemsPerPage: departmentPagination?.itemsPerPage | 10,
          totalItems: departmentPagination?.totalItems,
        }}
      />
    </>
  );
};
