//
import { Select as ASelect, Form } from "antd";
import styles from "./style.module.scss";
import React, { useEffect, useState } from "react";

type TypeOptions = {
  label: string | React.ReactNode;
  value: string | number;
};

type PropsType = {
  label: string;
  name: string;
  mode?: "multiple" | "tags";
  placeholder?: string;
  size?: "large" | "middle" | "small";
  required?: boolean;
  value?: any;
  isDisable?: boolean;
  options: Array<TypeOptions> | undefined;
  isAllowClear?: boolean;
  errorMessage?: string;
  onChange: (e: any) => void;
};

const Select = ({
  label,
  mode,
  name,
  placeholder,
  size = "large",
  required = false,
  value,
  isDisable = false,
  onChange,
  isAllowClear,
  errorMessage,
  options,
}: PropsType) => {
  const [defaultValue, setDefaultValue] = useState<any>(value);

  useEffect(() => {
    setDefaultValue(value);
  }, [value]);

  const handleChange = (e: any) => {
    if (!Array.isArray(e)) {
      onChange({ [name]: { label: e?.label, value: e?.value } });
    } else {
      onChange({
        [name]: e?.map((item) => ({ label: item?.label, value: item?.value })),
      });
    }
  };
  return (
    <>
      <Form.Item
        name={name}
        hasFeedback
        rules={[
          {
            required,
            message:
              errorMessage ?? `Le champ ${label.toLowerCase()} est réquis.`,
          },
        ]}
      >
        <div className="">
          <label htmlFor={name} className={styles.select__label}>
            {label}
            {required ? (
              <span className={styles.select__required}> *</span>
            ) : (
              ""
            )}
          </label>
          <ASelect
            mode={mode}
            size={size}
            labelInValue
            disabled={isDisable}
            allowClear={isAllowClear}
            style={{ width: "100%" }}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={defaultValue}
            onChange={(e) =>
              // onChange({ [name]: { label: e?.label, value: e?.value } })
              handleChange(e)
            }
            options={options}
          />
        </div>
      </Form.Item>
    </>
  );
};

export default Select;
