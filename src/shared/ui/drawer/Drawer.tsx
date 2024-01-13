import { FC } from "react";
import { Drawer as ADrawer } from "antd";

type PropsType = {
  size?: "default" | "large";
  position?: "top" | "right" | "bottom" | "left";
  isOpenDrawer: boolean;
  children: string | React.ReactNode;
  title?: string;
  isFullWidth?: boolean;
  width?: string | number;
  onClose: () => void;
};

export const Drawer: FC<PropsType> = ({
  isOpenDrawer,
  title,
  children,
  width,
  position = "right",
  size = "default",
  isFullWidth = false,
  onClose,
}) => {
  return (
    <>
      <ADrawer
        title={title}
        placement={position}
        size={size}
        open={isOpenDrawer}
        width={isFullWidth ? 3000 : width}
        onClose={onClose}
      >
        {children}
      </ADrawer>
    </>
  );
};
