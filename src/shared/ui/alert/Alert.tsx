import React from "react";
import { Alert as AAlert } from "antd";

type AlertProps = {
  type?: "success" | "info" | "warning" | "error";
  banner?: boolean;
  showIcon?: boolean;
  message: string | React.ReactNode;
};

export const Alert = ({
  type = "success",
  showIcon = true,
  banner = true,
  message,
}: AlertProps) => {
  return (
    <AAlert type={type} message={message} banner={banner} showIcon={showIcon} />
  );
};
