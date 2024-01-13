import { FC } from "react";
import { Form, Input } from "antd";
import styles from "./style.module.scss";
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
export const Textarea: FC<InputType> = ({
  name,
  label,
  errorMessage,
  placeholder,
  isDisable,
  required = false,
  value,
  onChange,
}) => {
  const { TextArea } = Input;
  return (
    <>
      <Form.Item
        hasFeedback
        name={name}
        rules={[
          {
            required,
            message:
              errorMessage ?? `Le champ ${label.toLowerCase()} est réquis.`,
          },
        ]}
        initialValue={value}
        className="w-full"
      >
        <div className="w-full">
          <label htmlFor={name} className={styles.textarea__label}>
            {label}
          </label>
          <TextArea
            className="w-full"
            id={name}
            value={value}
            disabled={isDisable}
            placeholder={placeholder}
            onChange={(e) => onChange({ [name]: e?.target?.value })}
            rows={4}
          />
        </div>
      </Form.Item>
    </>
  );
};
