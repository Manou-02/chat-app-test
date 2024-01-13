import { Form, Upload } from "antd";
import { FC } from "react";
import { ImAttachment } from "react-icons/im";
import "./style.scss";

type InputType = {
  label: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  multiple?: boolean;
  size?: "large" | "middle" | "small";
  required?: boolean;
  value?: any;
  onChange: (e: any) => void;
};

export const UploadFile: FC<InputType> = ({
  name,
  label,
  errorMessage,
  required = false,
  multiple,
  onChange,
}) => {
  return (
    <Form.Item
      name={name}
      // hasFeedback
      rules={[
        {
          required,
          message: errorMessage,
        },
      ]}
    >
      <div className={"upload__container"}>
        <label className="date_picker__label" htmlFor={name}>
          {label}
        </label>
        {/* <Space className="w-full">
          <Picker
            id={name}
            className="w-full"
            size={size}
            name={name}
            value={value}
            onChange={(e: any) => onChange({ [name]: e })}
          />
        </Space> */}
        <Upload
          beforeUpload={() => false} //Remove the error in post
          multiple
          onChange={(e) =>
            onChange({
              [name]: multiple
                ? e?.fileList?.map((item: any) => item?.originFileObj)
                : e?.file,
            })
          }
          className="w-full"
          maxCount={!multiple ? 1 : 9000}
        >
          <div className={"upload__content"}>
            <ImAttachment className="w-[20px] h-[20px] transform hover:cursor-pointer hover:text-red-600 hover:scale-110" />
          </div>
        </Upload>
      </div>
    </Form.Item>
  );
};
