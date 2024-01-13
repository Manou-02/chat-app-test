import { Form, InputNumber } from "antd";
import { FC } from "react";

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

export const InputMoney: FC<InputType> = ({
  name,
  label,
  errorMessage,
  placeholder,
  size = "large",
  required = false,
  value,
  isDisable = false,
  onChange,
}) => {
  return (
    <>
      <Form.Item
        // name={name}
        hasFeedback
        rules={[
          {
            required,
            message: errorMessage ?? `Le champ ${label} est réquis.`,
          },
        ]}
      >
        <label htmlFor={name}>{label}</label>
        <InputNumber
          className="w-[100%]"
          type="number"
          size={size}
          name={name}
          min={1}
          disabled={isDisable}
          placeholder={placeholder}
          id={name}
          value={value}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          }
          parser={(value: any) => value!.replace(/\$\s?|( *)/g, "")}
          onChange={(e: any) => onChange({ [name]: e })}
        />
      </Form.Item>
    </>
  );
};
