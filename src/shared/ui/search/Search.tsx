import { FC } from "react";
import styles from "./style.module.scss";

type InputType = {
  name: string;
  placeholder?: string;
  value?: any;
  isDisable?: boolean;
  onChange: (e: any) => void;
};

export const Search: FC<InputType> = ({
  name,
  placeholder,
  onChange,
  value,
  isDisable,
}) => {
  return (
    <div className={styles.search__container}>
      <input
        id={name}
        onChange={(e) => onChange({ [name]: e?.target?.value })}
        name={name}
        disabled={isDisable}
        value={value}
        placeholder={placeholder}
        className="border-none outline-none w-full h-full px-[10px]"
      />
    </div>
  );
};
