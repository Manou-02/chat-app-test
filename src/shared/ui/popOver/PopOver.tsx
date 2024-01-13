import { FC } from "react";
import { Popover } from "antd";

type PropsType = {
  content: React.ReactNode;
  title?: string | React.ReactNode;
  trigger?: "hover" | "click" | "focus";
  position?:
    | "topLeft"
    | "top"
    | "topRight"
    | "leftTop"
    | "left"
    | "leftBottom"
    | "rightTop"
    | "right"
    | "rightBottom"
    | "bottomLeft"
    | "bottom"
    | "bottomRight";
  children: string | React.ReactNode;
};

export const PopOver: FC<PropsType> = ({
  content,
  title,
  children,
  position = "top",
  trigger = "hover",
}) => {
  return (
    <Popover
      content={content}
      title={title}
      trigger={trigger}
      placement={position}
    >
      {children}
    </Popover>
  );
};
