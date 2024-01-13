import { TimePicker } from "antd";

type PropsType = {
  label?: string;
  name: string;
  value?: any;
  onChange: (e: any) => void;
};

export const TimeRange = ({ label, name, value, onChange }: PropsType) => {
  const handleChange = (e: any) => {
    if (e) {
      const start = `${e[0]?.$H < 10 ? "0" + e[0]?.$H : e[0]?.$H}:${
        e[0]?.$m < 10 ? "0" + e[0]?.$m : e[0]?.$m
      }`;
      const end = `${e[1]?.$H < 10 ? "0" + e[1]?.$H : e[1]?.$H}:${
        e[1]?.$m < 10 ? "0" + e[1]?.$m : e[1]?.$m
      }`;

      onChange({ [name]: [{ start, end }] });
    } else {
      onChange(null);
    }
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <TimePicker.RangePicker value={value} onChange={handleChange} />
    </>
  );
};
