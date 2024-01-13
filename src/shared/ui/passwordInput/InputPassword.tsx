import { Input } from "antd";
import { FC } from "react";

type InputType = {
  label: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  size?: "large" | "middle" | "small";
  required?: boolean;
  value?: any;
  formik: any;
};

export const InputPassword: FC<InputType> = ({
  name,
  label,
  // errorMessage,
  placeholder,
  size = "large",
  // required = false,
  value,
  formik,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Input.Password
        id={name}
        //   onChange={(e: any) => onChange({ [name]: e?.target?.value })}
        name={name}
        size={size}
        value={value}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
      />
    </>
  );
};
