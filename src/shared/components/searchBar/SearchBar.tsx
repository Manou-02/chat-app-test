import { Input, InputProps } from "antd";
import { FC } from "react";
import { AiOutlineSearch } from "react-icons/ai";


type SearchBarType = {
    label: string;
    name: string;
    placeholder?: string;
    errorMessage?: string;
    size?: "large" | "middle" | "small";
    required?: boolean;
    value?: any;
    onChange: (e: any) => void;
};

export const SearchBar: FC<SearchBarType & InputProps> = ({
    label,
    name,
    placeholder,
    errorMessage,
    size,
    required,
    value,
    onChange,
    ...rest
}) => {
    // const [form] = Form.useForm();
    // const handleChange = (e: any) => {
    //     form.setFieldsValue({ [Object.keys(e)[0]]: Object.values(e)[0] });
    // };
    return (
        <>
            <Input
                {...rest}
                id={name}
                onChange={(e) => onChange({ [name]: e?.target?.value })}
                name={name}
                size={size}
                value={value}
                //defaultValue={value}
                placeholder={placeholder}
                prefix={<AiOutlineSearch className="site-form-item-icon" />}
            />
        </>
    )
}