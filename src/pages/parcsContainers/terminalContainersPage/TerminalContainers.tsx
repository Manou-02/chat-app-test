import { AppDispatch } from "@/app/appStore";
import { PaginationType } from "@/entities/pagination/Pagination";
import { fetchAllTerminal } from "@/features/parcsContainers/terminalContainer/actions";
import {
  useIsTerminalLoading,
  useTerminalData,
  useTerminalPagination,
  useTerminalRequest,
} from "@/features/parcsContainers/terminalContainer/lib";
import { TerminalServices } from "@/features/parcsContainers/terminalContainer/services/Terminal.services";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { HttpStatus } from "@/shared/config/Status";
import { CardItem } from "@/shared/ui/cardItem/CardItem";
import { Loader } from "@/shared/ui/loader/Loader";
import { Title } from "@/shared/ui/title/Title";
import Table from "@/widgets/components/table/Table";
import { DetailsTerminal } from "@/widgets/parcsContainers/terminalContainers/DetailsTerminal";
import { AddFormTerminal } from "@/widgets/parcsContainers/terminalContainers/form/AddFormTerminal";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { MdFactory } from "react-icons/md";
import { TbFreezeColumn } from "react-icons/tb";
import { useDispatch } from "react-redux";

type TerminalsTypes = {
  id: number;
  name?: string;
  center: {
    id: number;
    name: string;
  };
  capacity: string;
  occupiedPlaces: any;
  occupationsPercent: string;
  occupiedPlacesRate: any;
};

export const TerminalContainers = () => {
  const dispatch: AppDispatch = useDispatch();
  const terminalData = useTerminalData();
  const terminalRequest = useTerminalRequest();
  const isLoadingTerminal = useIsTerminalLoading();
  const terminalPagination: PaginationType = useTerminalPagination();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [totalOccup, setTotalOccup] = useState<any>(null);

  const columnHelperUsers = createColumnHelper<TerminalsTypes>();

  const columns: ColumnDef<TerminalsTypes, any>[] = [
    // columnHelperUsers.accessor("id", {
    //   header: () => <span>Numero</span>,
    //   cell: (props) => props.getValue(),
    //   enableColumnFilter: false,
    //   enableSorting: true,
    //   enableHiding: true,
    // }),
    columnHelperUsers.accessor("center.name", {
      header: () => <span>Centre </span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("name", {
      header: () => <span>Terminal</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("occupiedPlaces", {
      header: () => <span>Occupations</span>,
      cell: (props) => `${props.getValue()}/${props.row.original?.capacity}`,
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperUsers.accessor("occupiedPlacesRate", {
      header: () => <span>Occupations (%) </span>,
      cell: (props) => `${props.getValue()} %`,
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  useEffect(() => {
    dispatch(fetchAllTerminal(terminalRequest));
    getTotalOccupations();
  }, []);

  const handleChangeRequest = (e: any) => {
    dispatch(fetchAllTerminal({ ...terminalRequest, ...e }));
  };

  const handleSuccess = () => {
    dispatch(fetchAllTerminal(terminalRequest));
  };

  const getTotalOccupations = async () => {
    try {
      setIsLoading(true);
      const { status, data } = await TerminalServices.getTotal();

      if (status === HttpStatus.OK) {
        setTotalOccup(data?.data);
      } else {
        Toast.error("Une erreur s'est produite, veuillez réessayer");
      }
    } catch (error) {
      console.log(error);
      Toast.error("Une erreur s'est produite, veuillez réessayer");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Loader isLoading={isLoading || isLoadingTerminal} />
      <Table
        title="Terminal"
        tableTitle="Liste des Terminaux"
        data={terminalData}
        columns={columns}
        isCanHiddenColumn
        drawerWidth={1400}
        isEnableAdd
        isCanShow
        // isEnableExportCSV
        // isEnableExportPDF
        // isEnableExportExcel
        isDetailsDrawerFull
        isCanEdit
        onGetValue={(e: any) => setSelectedValue(e)}
        onSearch={handleChangeRequest}
        onFilter={handleChangeRequest}
        onChangePage={handleChangeRequest}
        addFormContent={
          <AddFormTerminal selected={null} onSuccess={handleSuccess} />
        }
        editFornContent={
          <AddFormTerminal selected={selectedValue} onSuccess={handleSuccess} />
        }
        detailsContent={<DetailsTerminal selected={selectedValue} />}
        pagination={{
          defaultCurrentPage: terminalPagination?.current || 1,
          itemsPerPage: terminalPagination?.itemsPerPage || 10,
          totalItems: terminalPagination?.totalItems || 0,
        }}
      >
        <div className="flex gap-[20px] my-[30px]">
          <CardItem>
            <div className="w-[200px] flex gap-[20px] items-center">
              <MdFactory color="green" className="w-[40px] h-[40px]" />
              <div className="">
                <Title size={9}>Total terminal</Title>
                <Title size={28}>{terminalPagination?.totalItems}</Title>
              </div>
            </div>
          </CardItem>
          <CardItem>
            <div className="w-[200px] flex gap-[20px] items-center">
              <TbFreezeColumn color="red" className="w-[40px] h-[40px]" />
              <div className="">
                <Title size={9}>Occupation totale</Title>
                <Title size={28}>
                  {totalOccup?.totalOccupiedUnities} /{" "}
                  {totalOccup?.totalCapacityOfAllTerminals}
                </Title>
              </div>
            </div>{" "}
          </CardItem>
        </div>
      </Table>
    </div>
  );
};
