import Table from "@/widgets/components/table/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "antd";
// import Title from "antd/es/typography/Title";
// import { FaRegFilePdf } from "react-icons/fa6";
// import { Button as ThemeButton } from "@/shared/ui/button/Button";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";
import {
  useGetOutData,
  useGetOutLoading,
  useGetOutPagination,
  useGetOutRequest,
} from "@/features/parcsContainers/getOut/lib";
import { PaginationType } from "@/entities/pagination/Pagination";
import { Loader } from "@/shared/ui/loader/Loader";
import { useEffect, useState } from "react";
import { fetchAllGetOut } from "@/features/parcsContainers/getOut/actions";
import { AddFormGetout } from "@/widgets/parcsContainers/getOut/addFormGetout";
import { IMAGES } from "@/shared/config/Images";

export type GoOut = {
  transporter: string;
  truckNumber: string;
  client: string;
  isDeliveryNoteSend: boolean;
  isInvoiceSend: boolean;
  driverLicenseNumber: string;
  carrier: {
    id: number;
    name: string;
  };
  customer: {
    refCustomer: string;
  };
  doc: any
};

export const GetOut = () => {


  const dispatch: AppDispatch = useDispatch();

  const getOutData = useGetOutData();
  const getOutRequest = useGetOutRequest();
  const isLoadingGetOut = useGetOutLoading();
  const getOutPagination: PaginationType = useGetOutPagination();

  const [, /*selected*/ setSelected] = useState<any>(null);

  const columnHelperVehicle = createColumnHelper<GoOut>();

  const columns: ColumnDef<GoOut, any>[] = [
    columnHelperVehicle.accessor("carrier.name", {
      header: () => <span>Transporteur</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      // enableHiding: true,
    }),
    columnHelperVehicle.accessor("truckNumber", {
      header: () => <span>N. Camion</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      // enableHiding: true,
    }),
    columnHelperVehicle.accessor("customer.refCustomer", {
      header: () => <span>Client</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      // enableHiding: true,
    }),
    columnHelperVehicle.accessor("isDeliveryNoteSend", {
      header: () => <span>Bon de livraison</span>,
      cell: (props) => <Checkbox checked={props.getValue()} />,
      enableColumnFilter: true,
      enableSorting: true,
      // enableHiding: true,
    }),
    columnHelperVehicle.accessor("isInvoiceSend", {
      header: () => <span>Facture</span>,
      cell: (props) => <Checkbox checked={props.getValue()} />,
      enableColumnFilter: true,
      enableSorting: true,
      // enableHiding: true,
    }),
    columnHelperVehicle.accessor("driverLicenseNumber", {
      header: () => <span>N. Permis chauffeur</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      // enableHiding: true,
    }),
    columnHelperVehicle.accessor("doc", {
      header: () => null,
      cell: () => <img
        src={IMAGES.PDF_IMAGE}
        alt="pdf"
        className="w-[40px] h-[40px] cursor-pointer"
      />,
      enableColumnFilter: false,
      enableSorting: false,
      enableHiding: true
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllGetOut(getOutRequest));
  }, []);

  const handleChangeRequest = (e: any) => {
    dispatch(fetchAllGetOut({ ...getOutRequest, ...e }));
  };

  const handleSuccess = () => {
    dispatch(fetchAllGetOut(getOutRequest));
  };

  return (
    <>
      <Loader isLoading={isLoadingGetOut} />
      <Table
        title={"Get Out"}
        data={getOutData}
        tableTitle={
          <div>
            <div>Listing des go</div>
            {/* <div className="mt-[12px]">
              <Button className="flex justify-center items-center bg-[#51A5FF] text-white hover:bg-white">
                <span className="mr-[8px]">
                  <FaRegFilePdf />
                </span>
                <span>Get outs</span>
              </Button>
            </div> */}
          </div>
        }
        columns={columns}
        isCanHiddenColumn
        isEnableAdd
        drawerWidth={1400}
        addFormContent={
          <AddFormGetout onSuccess={handleSuccess} />
        }
        onSearch={handleChangeRequest}
        onChangePage={handleChangeRequest}
        onFilter={handleChangeRequest}
        onGetValue={(e: any) => setSelected(e)}
        pagination={{
          defaultCurrentPage: getOutPagination?.current || 1,
          totalItems: getOutPagination?.totalItems || 0,
          itemsPerPage: getOutPagination?.itemsPerPage || 10,
        }}
      />
    </>
  );
};
