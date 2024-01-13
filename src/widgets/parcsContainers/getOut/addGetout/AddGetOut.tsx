// import {
//   BreadcrumbType,
//   CustomBreadcrumb,
// } from "@/shared/components/breadcrumb/CustomBreadcrumb";
// import Select from "@/shared/ui/select/Select";
// import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Button /*Checkbox*/ } from "antd";
import Title from "antd/es/typography/Title";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { Button as ThemeButton } from "@/shared/ui/button/Button";
// import { FormGetOut } from "../form/formGetOut";

export const AddGetOut = () => {
  // const itemsBreadcrumb: BreadcrumbType[] = [
  //   {
  //     title: "Parcs conteneurs",
  //   },
  //   {
  //     title: "Get Out",
  //     href: "#",
  //   },
  // ];

  const navigate = useNavigate();
  const handleClickPrevious = () => {
    navigate("/parcs-container/get-out");
  };
  return (
    <>
      {/* <CustomBreadcrumb separator=">" items={itemsBreadcrumb} /> */}
      <div className="flex w-full justify-start">
        <div className="flex justify-center items-center mr-4">
          <Button onClick={handleClickPrevious}>
            <FaChevronLeft />
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <Title
            className="text-[28px] mb-0 flex justify-center items-center"
            level={1}
          >
            Get Out
          </Title>
        </div>
      </div>
      <div className="flex flex-col h-[70vh] justify-between">
        {/* <FormGetOut /> */}
      </div>
    </>
  );
};
