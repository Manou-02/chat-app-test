import { Form, Space, DatePicker as Picker } from "antd";
import { FC } from "react";
import "./style.scss";

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

export const DatePicker: FC<InputType> = ({
  name,
  label,
  errorMessage,
  size = "large",
  required = false,
  value,
  onChange,
}) => {
  return (
    <Form.Item
      // name={name}
      hasFeedback
      rules={[
        {
          required,
          message:
            errorMessage ?? `Le champ ${label.toLowerCase()} est réquis.`,
        },
      ]}
    >
      <div className="date_picker__container">
        <label className="date_picker__label" htmlFor={name}>
          {label}
        </label>
        <Space className="w-full">
          <Picker
            id={name}
            className="w-full"
            size={size}
            name={name}
            value={value}
            onChange={(e: any) => onChange({ [name]: e })}
          />
        </Space>
      </div>
    </Form.Item>
  );
};
