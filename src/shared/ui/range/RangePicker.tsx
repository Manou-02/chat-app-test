import { DatePicker, Form } from "antd";
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

export const RangePicker = ({
  name,
  label,
  errorMessage,
  size = "large",
  required = false,
  // value,
  onChange,
}: InputType) => {
  return (
    <Form.Item
      // name={name}
      hasFeedback
      rules={[
        {
          required,
          message: errorMessage,
        },
      ]}
    >
      <div className="range__container">
        <label htmlFor={name}>{label}</label>
        <DatePicker.RangePicker
          id={name}
          name={name}
          size={size}
          //   placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </Form.Item>
  );
};
