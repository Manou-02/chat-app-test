import { authReducer } from "@/features/auth/reducers/Auth.reducers";
import { usersReducers } from "@/features/users/reducers/Users.reducer";
import { vehiclesReducers } from "@/features/flotte/vehicles/reducers/Vehicles.reducer";
import { vehicleReducers } from "@/features/flotte/vehicles/reducers/vehicle.reducer";
import { drawerReducer } from "@/shared/reducers/drawer/drawer.reducer";
import { clientsReducers } from "@/features/clients/reducers/Clients.reducers";
import { terminalReducers } from "@/features/parcsContainers/terminalContainer/reducers/terminal.reducers";
import { getInReducer } from "@/features/parcsContainers/getIn/reducers/GetIn.reducers";
import { resercationReducers } from "@/features/parcsContainers/reservations/reducers/Reservation.reducers";
import { getOutReducers } from "@/features/parcsContainers/getOut/reducers/GetOut.reducer";
import { vehicleBrandsReducers } from "@/features/flotte/vehicleBrands/reducers/VehicleBrands.reducer";
import { vehicleModelsReducers } from "@/features/flotte/vehicleModels/reducers/VehicleModels.reducer";
import { CustomerTypesReducers } from "@/features/customerTypes/reducers/CustomerTypes.reducers";
import { TransportersReducers } from "@/features/transporters/reducers/Transporters.reducers";
import { createUserReducer } from "@/features/users/reducers/CreateUser.reducer";
import { tableReducer } from "@/shared/reducers/table/Table.reducer";
import { centersReducers } from "@/features/setting/centers/reducers/centers.reducer";
import { customerTypeReducers } from "@/features/setting/customerType/reducers/CustomerType.reducers";
import { providerReducers } from "@/features/setting/provider/reducers/Provider.reducer";
import { serviceTypeReducer } from "@/features/setting/serviceType/reducers/ServiceType.reducer";
import { containerTypesReducers } from "@/features/setting/containerTypes/reducers/ContainerTypes.reducer";
import { departmentReducers } from "@/features/setting/department/reducers/Department.reducers";
import { otherCostReducers } from "@/features/setting/otherCost/reducers/OtherCost.reducers";
import { averageCostsReducers } from "@/features/setting/averageCosts/reducers/AverageCosts.reducer";
import { transportersReducers } from "@/features/setting/transporters/reducers/Transporter.reducers";
import { foldersReducers } from "@/features/crm/folders/reducers/Folders.reducer";
import { transactionFormReducer } from "@/features/crm/transactions/reducers/TransactionForm.reducers";
import { transactionReducers } from "@/features/crm/transactions/reducers/Transactions.reducers";
import { shippingCompaniesReducers } from "@/features/setting/shippingCompanies/reducers/ShippingCompanies.reducer";
import { qualityReducers } from "@/features/setting/quality/reducers/Quality.reducers";
import { currencyReducers } from "@/features/setting/currency/reducers/Currency.reducer";
import { banksReducers } from "@/features/setting/bank/reducers/Banks.reducers";
import { banksFormReducer } from "@/features/setting/bank/reducers/BanksForm.reducers";

export const appReducer = {
    profileUser: authReducer,
    drawerState: drawerReducer,
    usersReducers,
    vehiclesReducers,
    clientsReducers,
    terminalReducers,
    getInReducer,
    resercationReducers,
    getOutReducers,
    vehicleReducers,
    vehicleBrandsReducers,
    vehicleModelsReducers,
    CustomerTypesReducers,
    TransportersReducers,
    createUserReducer,
    tableReducer,
    centersReducers,
    customerTypeReducers,
    providerReducers,
    serviceTypeReducer,
    containerTypesReducers,
    departmentReducers,
    otherCostReducers,
    averageCostsReducers,
    transportersReducers,
    foldersReducers,
    transactionFormReducer,
    transactionReducers,
    shippingCompaniesReducers,
    qualityReducers,
    currencyReducers,
    banksReducers,
    banksFormReducer,
}