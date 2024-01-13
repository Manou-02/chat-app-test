import { Input } from "antd";
import { FC } from "react";
import styles from "./style.module.scss";
import { FormikProps } from "formik";

type InputType = {
  label: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  size?: "large" | "middle" | "small";
  required?: boolean;
  value?: any;
  onChange?: (e: any) => void;
  formik: FormikProps<any>;
};

export const TextInputFormik: FC<InputType> = ({
  name,
  label,
  // errorMessage,
  placeholder,
  size = "large",
  // required = false,
  formik,
}) => {
  return (
    <>
      <label htmlFor={name} className={styles.input__label}>
        {label}
      </label>
      <Input
        id={name}
        // onChange={(e) => onChange({ [name]: e?.target?.value })}
        size={size}
        // defaultValue={value}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
      />
    </>
  );
};
