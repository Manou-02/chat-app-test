import { Form, Input } from "antd";
import { FC } from "react";
import styles from "./styles.module.scss";

type InputType = {
  label: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  size?: "large" | "middle" | "small";
  required?: boolean;
  value?: any;
  onChange: (e: any) => void;
};

export const PasswordInput: FC<InputType> = ({
  name,
  label,
  errorMessage,
  placeholder,
  size = "large",
  required = false,
  value,
  onChange,
}) => {
  return (
    <Form.Item
      name={name}
      hasFeedback
      rules={[
        {
          required,
          message: errorMessage ?? `Le champ ${label} est réquis.`,
        },
      ]}
    >
      <label htmlFor={name} className={styles.password__label}>
        {label}
        {required ? <span className={styles.password__required}> *</span> : ""}
      </label>
      <Input.Password
        id={name}
        onChange={(e: any) => onChange({ [name]: e?.target?.value })}
        name={name}
        size={size}
        value={value}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};
