import { AppDispatch } from "@/app/appStore";
import { PaginationType } from "@/entities/pagination/Pagination";
import { fetchAllGetIn } from "@/features/parcsContainers/getIn/actions";
import {
  useGetInData,
  useGetInLoading,
  useGetInPagination,
  useGetInRequest,
} from "@/features/parcsContainers/getIn/lib";
import { Loader } from "@/shared/ui/loader/Loader";
import Table from "@/widgets/components/table/Table";
// import { AddFormGetIn } from "@/widgets/parcsContainers/getIn/AddFormGetIn";
import { AddFormGetIn } from "@/widgets/parcsContainers/getIn/AddFormGetIn";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import classNames from "classnames";
import { Tag as TagAD } from "antd";
import Tag from "@/shared/ui/tag/Tag";
import dayjs from "dayjs";

// type GetInType = {
//   id: number;
//   containers: string;
//   bdr: string;
//   clients: string;
//   getIn: string;
//   getOut: string;
//   etat: string;
//   status: string;
// };

export type GetInType = {
  id?: number;
  containerNumber?: string;
  typeContainer?: number;
  containerStatus?: "bon" | "tres_bon" | "mauvais";
  containerStatusAble?: string;
  reservedStatus?: Terminal;
  isGetOut?: Carrier;
  terminalGetin?: {
    id: number;
    BDRnumber: string;
    carrier: {
      id: number;
      name: string;
    };
    carrierTruckNumber: string;
    terminal: {
      id: number;
      center: string;
      capacity: number;
      name: string;
      occupiedPlaces: number;
      occupiedPlacesRate: number;
    };
    shippingCompany: {
      id: number;
      name: string;
    };
    refGetin: string;
    createdAt: string;
  };
};

// const constainerState = [
//   {
//     label: "Très bon",
//     value: "tres_bon",
//     color: "text-blue-600",
//   },
//   {
//     label: "Bon",
//     value: "bon",
//     color: "text-orange-400",
//   },
//   {
//     label: "Mauvais",
//     value: "mauvais",
//     color: "text-secondary",
//   },
// ];

const getViewContainerState = (state: "tres_bon" | "bon" | "mauvais") => {
  switch (state) {
    case "tres_bon":
      return <TagAD className="text-blue-600">Très Bon</TagAD>;
    case "bon":
      return <TagAD className="text-orange-400">Bon</TagAD>;
    case "mauvais":
      return <TagAD className="text-secondary-400">Mauvais</TagAD>;
    default:
      return;
  }
};
export type Carrier = {
  id?: number;
  name?: string;
};

export type Container = {
  id?: number;
  containerNumber?: string;
  typeContainer?: number;
  containerStatus?: string;
  containerStatusAble?: boolean;
};

export type Terminal = {
  id?: number;
  center?: Carrier;
  capacity?: number;
  name?: string;
};

export const GetIn = () => {
  const dispatch: AppDispatch = useDispatch();
  const getInData = useGetInData();
  const getInLoading = useGetInLoading();
  const getInRequest = useGetInRequest();
  const getInPagination: PaginationType = useGetInPagination();

  const [isLoading] = useState<boolean>(false);
  const [, /*selected*/ setSelected] = useState<any>(null);

  const columnHelperUsers = createColumnHelper<GetInType>();

  const columns: ColumnDef<GetInType, any>[] = [
    columnHelperUsers.accessor("terminalGetin.terminal.name", {
      header: () => <span>Terminal</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("containerNumber", {
      header: () => <span>Containers</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("terminalGetin.BDRnumber", {
      header: () => <span>BDR</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("terminalGetin.shippingCompany.name", {
      header: () => <span>Compagnie maritime</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("terminalGetin.createdAt", {
      header: () => <span>Get In</span>,
      cell: (props) => dayjs(props.getValue()).format("DD/MM/YYYY"),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("refGetout", {
      header: () => <span>Get out</span>,
      cell: (props) =>
        props.getValue() ? dayjs(props.getValue()).format("DD/MM/YYYY") : "-",
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("containerStatus", {
      header: () => <span>Etat</span>,
      cell: (props) => getViewContainerState(props.getValue()),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("containerStatusAble", {
      header: () => <span>Status</span>,
      cell: (props) => (
        <>
        {props.getValue() ? (
          <div className="py-[5px]">
            <Tag type="success">Apte</Tag>
          </div>
        ) : (
          <div className="py-[5px]">
            <Tag type="error">Inapte</Tag>
          </div>
        )}
      </>
      ),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllGetIn(getInRequest));
  }, []);

  const handleChangeRequest = (e: any) => {
    dispatch(fetchAllGetIn({ ...getInRequest, ...e }));
  };

  const handleSuccess = () => {
    dispatch(fetchAllGetIn(getInRequest));
  };

  return (
    <div>
      <Loader isLoading={isLoading || getInLoading} />
      <Table
        title="Get in"
        tableTitle="Listing des opérations"
        // tableTitle={
        //   <div>
        //     <div>Listing des go</div>
        //     <div className="mt-[12px] flex gap-[10px]">
        //       <Button className="flex justify-center items-center bg-[#51A5FF] text-white hover:bg-white">
        //         <span className="mr-[8px]">
        //           <FaRegFilePdf />
        //         </span>
        //         <span>Get ins</span>
        //       </Button>
        //       <Button className="flex justify-center items-center bg-[#51A5FF] text-white hover:bg-white">
        //         <span className="mr-[8px]">
        //           <FaRegFilePdf />
        //         </span>
        //         <span>Get outs</span>
        //       </Button>
        //     </div>
        //   </div>
        // }
        data={getInData}
        columns={columns}
        isCanHiddenColumn
        drawerWidth={1400}
        isEnableAdd
        // isCanEdit
        onSearch={handleChangeRequest}
        onChangePage={handleChangeRequest}
        onFilter={handleChangeRequest}
        onGetValue={(e: any) => setSelected(e)}
        pagination={{
          defaultCurrentPage: getInPagination?.current || 1,
          totalItems: getInPagination?.totalItems || 0,
          itemsPerPage: getInPagination?.itemsPerPage || 10,
        }}
        addFormContent={<AddFormGetIn onSuccess={handleSuccess} />}
      ></Table>
    </div>
  );
};
