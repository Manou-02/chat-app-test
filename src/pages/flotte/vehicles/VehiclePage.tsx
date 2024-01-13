import { Vehicle } from "@/entities/flotte/Vehicle";
import { fetchAllvehicleBrands } from "@/features/flotte/vehicleBrands/actions";
import {
  // useVehicleBrandsData, 
  useVehicleBrandsRequests
} from "@/features/flotte/vehicleBrands/lib";
import { fetchAllvehicleModels } from "@/features/flotte/vehicleModels/actions";
import {
  // useVehicleModelsData, 
  useVehicleModelsRequests
} from "@/features/flotte/vehicleModels/lib";
import { fetchAllVehicles } from "@/features/flotte/vehicles/actions";
import { useVehiclesData, useVehiclesPagination, useVehiclesRequests } from "@/features/flotte/vehicles/lib";
import Table from "@/widgets/components/table/Table";
import { FormVehicle } from "@/widgets/flotte/vehicle/form/formVehicle";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Tag } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const VehiclePage = () => {
  const dispatch: any = useDispatch();
  const allVehicles = useVehiclesData();
  // const allVehicleBrands = useVehicleBrandsData()
  // const allVehicleModels = useVehicleModelsData()
  // const isVehicleLoading = useVehiclesIsLoading();
  // const pagination = useVehiclesPagination();
  const vehiclesRequests = useVehiclesRequests();
  const vehicleBrandsRequests = useVehicleBrandsRequests();
  const vehicleModelsRequests = useVehicleModelsRequests();
  const vehiclesPagination = useVehiclesPagination();

  // const [value, setValue] = useState<any>(null);
  // const [, setSearchValue] = useState<any>(null);
  // const [filterValue, setFilterValue] = useState<any>({});

  useEffect(() => {
    dispatch(fetchAllVehicles(vehiclesRequests));
    dispatch(fetchAllvehicleBrands(vehicleBrandsRequests));
    dispatch(fetchAllvehicleModels(vehicleModelsRequests));
  }, []);

  const handleChangeRequest = (e: any) => {
    dispatch(fetchAllVehicles({ ...vehiclesRequests, ...e }));
  };

  const data: Vehicle[] = allVehicles;
  const columnHelperVehicle = createColumnHelper<Vehicle>();

  // const navigate = useNavigate();


  const getVehicletype = (vehicleTypeId: number) => {
    switch (vehicleTypeId) {
      case 1:
        return "Remorque";
      case 2:
        return "Semi";
      case 3:
        return "élévateur";
      case 4:
        return "Plateau";
      default:
        return;
    }
  }

  const columns: ColumnDef<Vehicle, any>[] = [
    columnHelperVehicle.accessor("registrationNumber", {
      header: () => <span>Matricule</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      // enableHiding: true,
    }),
    columnHelperVehicle.accessor("vehicleBrand.name", {
      header: () => <span>Marque</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelperVehicle.accessor("payload", {
      header: () => <span>Charge utile</span>,
      cell: (props) => props.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperVehicle.accessor("state", {
      header: () => <span>Disponibilité</span>,
      cell: (props) => getDisponibility(props.getValue()),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelperVehicle.accessor("type", {
      header: () => <span>Type</span>,
      cell: (props) => getVehicletype(props.getValue()),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: true,
    }),
  ];

  const getDisponibility = (disponibility: number) => {
    switch (disponibility) {
      case 0:
        return <><Tag color="blue">En cours de route</Tag></>
      case 1:
        return <><Tag color="success">Disponible</Tag></>
      case 2:
        return <Tag color="warning">Pas de chauffeur</Tag>
      case 3:
        return <Tag color="error">En maintenance</Tag>
      case 4:
        return <Tag color="cyan">A vendre</Tag>
      case 5:
        return <Tag color="default">En congé</Tag>
    }
  }

  return (
    <>
      <Table
        title="Véhicules"
        data={data}
        tableTitle="Listes des véhicules"
        isCanClickOnRow
        columns={columns}
        isCanHiddenColumn
        drawerWidth={1400}
        isEnableAdd
        onChangePage={handleChangeRequest}
        onSearch={(e: any) => console.log(e)}
        onFilter={(e: any) => console.log(e)}
        onGetValue={(e: any) => console.log(e)}
        addFormContent={
          <FormVehicle />
        }
        pagination={{
          defaultCurrentPage: vehiclesPagination?.current || 1,
          itemsPerPage: vehiclesPagination?.itemsPerPage || 10,
          totalItems: vehiclesPagination?.totalItems || 0,
        }}

      // onSearchByColumn={(e : any) => console.log()}
      />
    </>
  );
};
