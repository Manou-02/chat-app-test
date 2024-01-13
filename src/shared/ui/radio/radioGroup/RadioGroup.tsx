import { Radio as ARadio } from "antd";

type OptionsType = {
  label: string;
  value: string | any;
};

type PropsType = {
  label: string;
  value?: any;
  name: string;
  mode?: "vertical" | "horizontal";
  options: Array<OptionsType>;
  onChange: (e: any) => void;
};

export const Radio = ({ label, value, name, onChange, options }: PropsType) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <ARadio.Group
        value={value}
        onChange={(e: any) => onChange({ [name]: e.target.value })}
      >
        {options?.map((item: OptionsType, key: number) => (
          <ARadio key={key} name={name} value={item?.value}>
            {item?.label}{" "}
          </ARadio>
        ))}
      </ARadio.Group>
    </div>
  );
};
