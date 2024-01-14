import { FC } from "react";
import styles from "./style.module.scss";

type InputType = {
  name: string;
  placeholder?: string;
  value?: any;
  isDisable?: boolean;
  onChange: (e: any) => void;
};

export const MessageInput: FC<InputType> = ({
  name,
  placeholder,
  onChange,
  value,
  isDisable,
}) => {
  return (
    <div className={styles.message_input__container}>
      <input
        id={name}
        onChange={(e) => onChange({ [name]: e?.target?.value })}
        name={name}
        disabled={isDisable}
        value={value}
        placeholder={placeholder}
        className={styles.message_input__input}
      />
    </div>
  );
};
