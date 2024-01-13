import { Checkbox as ACheckbox } from "antd";
import styles from "./styles.module.scss";

type PropsType = {
  name: string;
  label?: string;
  onChange: (e: any) => void;
  disabled?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
};

export const Checkbox = ({
  name,
  label,
  onChange,
  checked = false,
  disabled = false,
  defaultChecked,
}: PropsType) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <ACheckbox
        name={name}
        checked={checked}
        disabled={disabled}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange({ [name]: e.target.checked })}
      >
        <span className={styles.checkbox__label}>{label}</span>
      </ACheckbox>
    </div>
  );
};
