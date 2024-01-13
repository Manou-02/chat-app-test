import { Tag as ATag } from "antd";
import React from "react";

type PropsType = {
  type?: "success" | "processing" | "error" | "warning" | "default";
  children: React.ReactNode;
};

const Tag = ({ children, type = "default" }: PropsType) => {
  return (
    <ATag color={type} className="rounded-[50px]">
      {" "}
      {children}{" "}
    </ATag>
  );
};

export default Tag;
