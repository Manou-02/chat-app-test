import { DatePicker } from "antd";
import "./style.scss";

type InputType = {
  label: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  size?: "large" | "middle" | "small";
  required?: boolean;
  value?: any;
  //   onChange: (e: any) => void;
  formik: any;
};

export const DateRange = ({
  name,
  label,
  //   errorMessage,
  size = "large",
  //   required = false,
  //   value,
  //   onChange,
  formik,
}: InputType) => {
  return (
    <div className="range__container">
      <label htmlFor={name}>{label}</label>
      <DatePicker.RangePicker
        id={name}
        name={name}
        size={size}
        //   placeholder={placeholder}
        {...formik.getFieldProps(name)}

        //   onChange={onChange}
      />
    </div>
  );
};
