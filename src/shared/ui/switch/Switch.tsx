import { Form, Switch as ASwitch } from "antd";
import styles from "./style.module.scss";

type SwitchType = {
  label: string;
  name: string;
  errorMessage?: string;
  checkedText?: string;
  uncheckedText?: string;
  size?: "default" | "small";
  value?: any;
  onChange: (e: any) => void;
};

const Switch = ({
  label,
  name,
  value = false,
  size = "default",
  checkedText,
  uncheckedText,
  errorMessage,
  onChange,
}: SwitchType) => {
  return (
    <Form.Item
      // name={name}
      hasFeedback
      rules={[
        {
          required: false,
          // type: variant,
          // min: min,
          message: errorMessage,
        },
      ]}
    >
      <div className={styles.switch__content}>
        <label htmlFor={name}>{label}</label>
        <ASwitch
          id={name}
          size={size}
          defaultChecked={value}
          onClick={(e: any) => onChange({ [name]: e })}
          onChange={(e: any) => onChange({ [name]: e })}
          checkedChildren={checkedText}
          unCheckedChildren={uncheckedText}
        />
      </div>
    </Form.Item>
  );
};

export default Switch;
