import { InputNumber as AInputNumber, Form } from "antd";
import { FC } from "react";
import style from "./styles.module.scss";

type InputType = {
  label: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  size?: "large" | "middle" | "small";
  required?: boolean;
  value?: any;
  min?: number;
  max?: number;
  onChange: (e: any) => void;
};

export const InputNumber: FC<InputType> = ({
  name,
  label,
  errorMessage,
  placeholder,
  size = "large",
  min = 0,
  max,
  required = false,
  value,
  onChange,
}) => {
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
        <div className={style.input_number__content}>
          <label htmlFor={name} className={style.input_number__label}>
            {label}
            {required ? (
              <span className={style.input_number__required}> *</span>
            ) : (
              ""
            )}
          </label>
          <AInputNumber
            className="w-[100%]"
            id={name}
            type="number"
            onChange={(e) => onChange({ [name]: +e })}
            name={name}
            min={min}
            max={max}
            size={size}
            value={value}
            placeholder={placeholder}
          />
        </div>
      </Form.Item>
    </>
  );
};
