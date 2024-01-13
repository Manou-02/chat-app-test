import { RouteObject, createHashRouter } from "react-router-dom";
import { LoginPage } from "@/pages/auth/login/LoginPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Logout } from "@/pages/auth/logout/Logout";
import { TestComponent } from "@/pages/test-component";

const privateRoutes: RouteObject[] = [
  {
    path: "*",
    lazy: async () => {
      let { NotFound } = await import("@/pages/notFound/NotFoundPage");
      return { Component: NotFound };
    },
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    errorElement: <div>error</div>,
    children: [
      {
        path: "/",
        lazy: async () => {
          let { VehiclePage } = await import(
            "@/pages/flotte/vehicles/VehiclePage"
          );
          return { Component: VehiclePage };
        },
      },
      // {
      //   path: "style-guides",
      //   index: true,
      //   lazy: async () => {
      //     let { StyleGuides } = await import(
      //       "@/pages/styleGuides/StyleGuides.tsx"
      //     );
      //     return { Component: StyleGuides };
      //   },
      // },
      {
        path: "setting/",
        children: [
          {
            path: "user",
            lazy: async () => {
              let { UserPage } = await import("@/pages/setting/users/UserPage");
              return { Component: UserPage };
            },
          },
          {
            path: "customer-type",
            lazy: async () => {
              let { CustomerTypePage } = await import(
                "@/pages/setting/customerType/CustomerTypePage"
              );
              return { Component: CustomerTypePage };
            },
          },
           {
             path: "centers",
             lazy: async () => {
               let { CentersPage } = await import(
                 "@/pages/setting/centers/CentersPage"
               );
               return { Component: CentersPage };
             },
           },
          {
            path: "provider",
            lazy: async () => {
              let { ProviderPage } = await import(
                "@/pages/setting/provider/ProviderPage"
              );
              return { Component: ProviderPage };
            },
          },
          {
            path: "service-type",
            lazy: async () => {
              let { ServicesType } = await import(
                "@/pages/setting/servicesType/ServicesType"
              );
              return { Component: ServicesType };
            },
          },
          {
            path: "vehicle-brand",
            lazy: async () => {
              let { VehicleBrandsPage } = await import(
                "@/pages/setting/vehicleBrands/VehicleBrandsPage"
              );
              return { Component: VehicleBrandsPage };
            },
          },
          {
            path: "vehicle-model",
            lazy: async () => {
              let { VehicleModelsPage } = await import(
                "@/pages/setting/vehicleModels/VehicleModelsPage"
              );
              return { Component: VehicleModelsPage };
            },
          },
          {
            path: "shipping-company",
            lazy: async () => {
              let { ShippingCompaniesPage } = await import(
                "@/pages/setting/shippingCompanies/ShippingCompaniesPage"
              );
              return { Component: ShippingCompaniesPage };
            },
          },
           {
             path: "department",
             lazy: async () => {
               let { DepartmentPage } = await import(
                 "@/pages/setting/department/DepartmentPage"
               );
               return { Component: DepartmentPage };
             },
           },
          {
            path: "user",
            lazy: async () => {
              let { UserPage } = await import("@/pages/setting/users/UserPage");
              return { Component: UserPage };
            },
          },
          {
            path: "type-container",
            lazy: async () => {
              let { ContainerTypesPage } = await import(
                "@/pages/setting/containerTypes/ContainerTypesPage"
              );
              return { Component: ContainerTypesPage };
            },
          },
          // {
          //   path: "other-cost",
          //   lazy: async () => {
          //     let { OtherCostPage } = await import(
          //       "@/pages/setting/otherCost/OtherCostPage"
          //     );
          //     return { Component: OtherCostPage };
          //   },
          // },
          // {
          //   path: "average-cost",
          //   lazy: async () => {
          //     let { AverageCostsPage } = await import(
          //       "@/pages/setting/averageCosts/AverageCostsPage"
          //     );
          //     return { Component: AverageCostsPage };
          //   },
          // },
          {
            path: "transporter",
            lazy: async () => {
              let { TransporterPage } = await import(
                "@/pages/setting/transporter/TransporterPage"
              );
              return { Component: TransporterPage };
            },
          },
          {
            path: "quality",
            lazy: async () => {
              let { QualityPage } = await import(
                "@/pages/setting/quality/QualityPage"
              );
              return { Component: QualityPage };
            },
          },
          {
            path: "currency",
            lazy: async () => {
              let { CurrencyPage } = await import(
                "@/pages/setting/currency/CurrencyPage"
              );
              return { Component: CurrencyPage };
            },
          },
          {
            path: "banks",
            lazy: async () => {
              let { BanksPage } = await import(
                "@/pages/setting/banks/BanksPage"
              );
              return { Component: BanksPage };
            },
          },
        ],
      },
      {
        path: "clients",
        lazy: async () => {
          let { ClientsPage } = await import(
            "@/pages/clients/clientsPage/ClientsPage"
          );
          return { Component: ClientsPage };
        },
      },
      {
        path: "flotte",
        children: [
          {
            path: "cars",
            lazy: async () => {
              let { VehiclePage } = await import(
                "@/pages/flotte/vehicles/VehiclePage"
              );
              return { Component: VehiclePage };
            },
          },
          {
            path: "cars/:id",
            lazy: async () => {
              let { VehicleDetailPage } = await import(
                "@/pages/flotte/vehicles/VehicleDetailPage"
              );
              return { Component: VehicleDetailPage };
            },
          },
        ],
      },
      {
        path: "crm",
        children: [
          {
            path: "dossiers",
            lazy: async () => {
              let { FoldersPage } = await import(
                "@/pages/crm/folders/FoldersPage"
              );
              return { Component: FoldersPage };
            },
          },
          {
            path: "transactions",
            lazy: async () => {
              let { TransactionPage } = await import(
                "@/pages/crm/transactions/TransactionsPage"
              );
              return { Component: TransactionPage };
            },
          },
        ],
      },
      {
        path: "terminal-container",
        children: [
          {
            path: "terminal",
            lazy: async () => {
              let { TerminalContainers } = await import(
                "@/pages/parcsContainers/terminalContainersPage/TerminalContainers"
              );
              return { Component: TerminalContainers };
            },
          },
          {
            path: "get-in",
            lazy: async () => {
              let { GetIn } = await import(
                "@/pages/parcsContainers/getInPage/GetIn"
              );
              return { Component: GetIn };
            },
          },
          {
            path: "get-out",
            lazy: async () => {
              let { GetOut } = await import(
                "@/pages/parcsContainers/getOutPage/GetOut"
              );
              return { Component: GetOut };
            },
          },
          {
            path: "reservations",
            lazy: async () => {
              let { Reservations } = await import(
                "@/pages/parcsContainers/reservationsPage/Reservations"
              );
              return { Component: Reservations };
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/test-component",
    element: <TestComponent />
  }
];

export const appRouter = () => {
  return createHashRouter(privateRoutes);
};
