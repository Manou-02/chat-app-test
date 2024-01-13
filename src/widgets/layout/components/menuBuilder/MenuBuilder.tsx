import { FC } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Color } from "@/shared/config/Colors";

type TypeMenuItem = {
  label: string;
  key: string;
  icon?: React.ReactNode;
  path?: string;
  children?: TypeMenuItem[];
  type?: string;
};

type PropsType = {
  menuList: Array<TypeMenuItem>;
  width?: number | string;
  mode?: "vertical" | "horizontal" | "inline";
  isActive?: boolean;
};

export const MenuBuilder: FC<PropsType> = ({
  menuList,
  width,
  mode = "inline",
  isActive = false,
}) => {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <Menu
        className={classNames({
          "h-[100vh]": mode === "inline",
          "flex justify-end": mode != "inline",
          "border-none": mode != "inline",
          "bg-darkBlue": mode === "inline"
        })}
        onClick={onClick}
        style={{ width, color: Color.SECONDARY, fontWeight: "bold" }}
        defaultSelectedKeys={
          isActive
            ? [
              menuList[0]?.children
                ? menuList[0]?.children[0]["key"]
                : menuList[0]["key"],
            ]
            : []
        }
        defaultOpenKeys={[menuList[0]["key"]]}
        mode={mode}
        items={menuList}
      />
    </>
  );
};
