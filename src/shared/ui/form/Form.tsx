import React from "react";
import { Form as AForm } from "antd";

type FormType = {
  form: any;
  children: React.ReactNode;
  onSubmit: (e: any) => void;
  className?: any;
};

export const FormCustom = ({
  form,
  children,
  onSubmit,
  className,
}: FormType) => {
  return (
    <AForm form={form} initialValues={form} onFinish={onSubmit} {...className}>
      {children}
    </AForm>
  );
};
