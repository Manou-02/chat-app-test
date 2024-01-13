import { Input, Form } from "antd";
import { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";

type InputType = {
  label: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  size?: "large" | "middle" | "small";
  required?: boolean;
  value?: any;
  isDisable?: boolean;
  onChange: (e: any) => void;
};

export const TextInput: FC<InputType> = ({
  name,
  label,
  errorMessage,
  placeholder,
  isDisable,
  size = "large",
  required = false,
  value,
  onChange,
}) => {
  const [defaultValue, setDefaultValue] = useState<any>(value);

  useEffect(() => {
    setDefaultValue(value);
  }, [value]);

  return (
    <>
      <Form.Item
        hasFeedback
        name={name}
        rules={[
          {
            required,
            message:
              errorMessage ?? `Le champ ${label.toLowerCase()} est réquis.`,
          },
        ]}
        initialValue={value}
      >
        <div>
          <label htmlFor={name} className={styles.input__label}>
            {label}
            {required ? <span className={styles.input__required}> *</span> : ""}
          </label>
          <Input
            id={name}
            onChange={(e) => onChange({ [name]: e?.target?.value })}
            name={name}
            size={size}
            disabled={isDisable}
            value={defaultValue}
            // defaultValue={value}
            placeholder={placeholder}
          />
        </div>
      </Form.Item>
    </>
  );
};
