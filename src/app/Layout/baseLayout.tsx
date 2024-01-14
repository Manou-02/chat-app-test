import { Color } from "@/shared/config/Colors";
import MainLayout from "@/widgets/components/mainLayout/MainLayout";
import { Navbar } from "@/widgets/layout/components/navbar/Navbar";
import { Sidebar } from "@/widgets/layout/components/sidebar/Sidebar";
import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
// import { Toaster } from "sonner";

export const BaseLayout = (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: Color.PRIMARY,
      },
      components: {
        Tabs: {
          colorPrimary: Color.PRIMARY,
          colorPrimaryActive: Color.PRIMARY,
          colorPrimaryText: Color.PRIMARY,
          colorPrimaryHover: "Color.PRIMARY",
          borderRadius: 8,
          borderRadiusLG: 12,
        },
        Button: {
          colorPrimary: Color.PRIMARY,
          colorPrimaryActive: Color.GRAY,
        },
      },
    }}
  >
    <div className="flex">
      {/* <Toaster /> */}
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <MainLayout>
          {/* <CustomBreadcrumb /> */}
          <Outlet />
        </MainLayout>
      </div>
    </div>
  </ConfigProvider>
);
