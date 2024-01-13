import { PaginationType } from "@/entities/pagination/Pagination";
import { GetInService } from "@/features/parcsContainers/getIn/services/GetIn.services";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { HttpStatus } from "@/shared/config/Status";
import { Loader } from "@/shared/ui/loader/Loader";
//import { Title } from "@/shared/ui/title/Title";
import Table from "@/widgets/components/table/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Tag from "@/shared/ui/tag/Tag";
import classNames from "classnames";

const constainerState = [
  {
    label: "Très bon",
    value: "tres_bon",
    color: "text-blue-600",
  },
  {
    label: "Bon",
    value: "bon",
    color: "text-orange-400",
  },
  {
    label: "Mauvais",
    value: "mauvais",
    color: "text-secondary",
  },
];

export type Welcome = {
  id?: number;
  carrier?: Carrier;
  carrierTruckNumber?: string;
  noDocumentTransport?: string;
  containers?: Container[];
  terminal?: Terminal;
  shippingCompany?: Carrier;
  refGetin?: string;
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

type PropsType = {
  selected: any;
};

export const DetailsTerminal = ({ selected }: PropsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detailsData, setDetailsData] = useState<any>([]);
  const [detailsPagination, setDetailsPagination] = useState<
    PaginationType | any
  >({});

  const columnHelperUsers = createColumnHelper<any>();

  const columns: ColumnDef<any, any>[] = [
    columnHelperUsers.accessor("terminalGetin", {
      header: () => <span>Compagnie Maritime</span>,
      cell: (props) => props.getValue()?.shippingCompany?.name,
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("containerNumber", {
      header: () => <span>Numéro Container</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("createdAt", {
      header: () => <span>Get In</span>,
      cell: (props) => dayjs(props.getValue()).format("DD/MM/YYYY"),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("typeContainer", {
      header: () => <span>Type de Container</span>,
      cell: (props) => `${props.getValue()} pieds`,
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("typeContainer", {
      header: () => <span>Place occupée</span>,
      cell: (props) => (
        <>
          {!props.row.original.containerStatusAble ? (
            props.row.original.isGetOut ? (
              <div className="py-[5px]">
                <Tag type="error">Out</Tag>
              </div>
            ) : (
              <div className="py-[5px]">
                <Tag type="warning">Inapte</Tag>
              </div>
            )
          ) : (
            `${props.getValue() / 20}`
          )}
        </>
      ),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("containerStatus", {
      header: () => <span>Etat du container</span>,
      cell: (props) => (
        <>
          <span
            className={classNames(
              "py-[5px] ",
              constainerState?.find(
                (data: any) => data?.value === props.getValue()
              )?.color
            )}
          >
            {`${
              constainerState?.find(
                (data: any) => data?.value === props.getValue()
              )?.label
            }`}
          </span>
        </>
      ),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("reservedStatus", {
      header: () => <span>Statut</span>,
      cell: (props) => (
        <>
          {props.getValue() ? (
            <div className="py-[5px]">
              <Tag type="success">Réservé</Tag>
            </div>
          ) : (
            <div className="py-[5px]">
              <Tag type="error">Non réservé</Tag>
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
    console.log("Selected", selected);
    getGetIn({ "terminalGetin.terminal.id": selected?.id });
  }, [selected]);

  const getGetIn = async (params?: any) => {
    try {
      setIsLoading(true);
      const { status, data } = await GetInService.getAllGetIn(params);

      if (status === HttpStatus.OK) {
        setDetailsData(data?.data);
        setDetailsPagination(data?.payload?.pagination);
      } else {
        Toast.error(
          data?.status?.message ||
            "Une erreur s'est produite, veuillez réessayer plus tard."
        );
      }
    } catch (error) {
      console.log(error);
      Toast.error("Une erreur s'est produite, veuillez réessayer plus tard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeParams = (params: any) => {
    getGetIn({ "terminalGetin.terminal.id": selected?.id, ...params });
  };

  return (
    <div>
      <Loader isLoading={isLoading} />
      <Table
        title={`${selected?.center?.name} / ${selected?.name}`} //Dynamic
        tableTitle={`Places occupées : ${selected?.occupiedPlaces}`}
        data={detailsData}
        columns={columns}
        isCanHiddenColumn
        drawerWidth={1400}
        // isDrawerFullScreen
        //   isCanEdit
        //     addFormContent={<ClientsForm />}
        //   editFornContent={<ClientsForm />}
        onSearch={handleChangeParams}
        onFilter={handleChangeParams}
        onGetValue={(e: any) => console.log(e)}
        onChangePage={handleChangeParams}
        pagination={{
          defaultCurrentPage: detailsPagination?.current | 1,
          totalItems: detailsPagination?.totalItems | 0,
          itemsPerPage: detailsPagination?.itemsPerPage | 10,
        }}
      />
      {/* <div className="">
        <Title>Places libre : {"256"} </Title>
      </div> */}
    </div>
  );
};
