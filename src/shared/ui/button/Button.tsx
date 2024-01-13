import { FC } from "react";
import "./style.button.scss";
import { Form } from "antd";
import classnames from "classnames";

type ButtonPropsType = {
  children: string | JSX.Element | React.ReactNode;
  size?: "md" | "sm";
  typeButton?:
    | "primary"
    | "primary-rounded"
    | "secondary"
    | "secondary-rounded"
    | "dark"
    | "dark-rounded"
    | "dark-transparent"
    | "dark-transparent-rounded";
  isTypeSubmit?: boolean;
  isFullWidth?: boolean;
  disabled?: boolean;
  rest?: any;
  onClick?: (e?: any) => void;
};

export const Button: FC<ButtonPropsType> = ({
  children,
  typeButton = "primary",
  isTypeSubmit = false,
  size = "sm",
  onClick,
  disabled = false,
  isFullWidth = false,
}) => {
  return (
    <>
      {isTypeSubmit ? (
        <Form.Item className={classnames(isFullWidth ? "w-full" : "")}>
          <button
            disabled={disabled}
            className={classnames(
              `button__${typeButton} button__size-${size}`,
              isFullWidth ? "w-full" : ""
            )}
            type="submit"
          >
            {children}
          </button>
        </Form.Item>
      ) : (
        <button
          disabled={disabled}
          className={classnames(
            ` button__${typeButton}`,
            isFullWidth ? "w-full" : ""
          )}
          onClick={onClick}
        >
          {" "}
          {children}{" "}
        </button>
      )}
    </>
  );
};
