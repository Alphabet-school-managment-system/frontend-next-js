import { Select as MainSelect } from "antd";
import { selectType } from "@/types";
import { SelectMode } from "../forms/FormGenerator";

type Props = {
  data: selectType[];
  placeholderText?: string;
  onChange?: (value: any) => void;
  classNames?: string;
  variant?: "outlined" | "filled" | "borderless" | "underlined";
  allowClear?: boolean;
  allowSearch?: boolean;
  size?: "large" | "middle" | "small";
  prefix?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  mode?: SelectMode;
  disabled?: boolean;
  value?: any;
  onClear?: () => void;
};

export const Select = ({
  data,
  placeholderText,
  onChange,
  classNames,
  variant = "outlined",
  allowClear = false,
  allowSearch = false,
  size = "large",
  prefix,
  suffixIcon,
  mode,
  disabled,
  value,
  onClear,
}: Props) => {
  return (
    <div className="flex justify-end w-full!">
      <MainSelect
        placeholder={placeholderText}
        size={size}
        className={`${classNames ?? ""} cursor-pointer!`}
        variant={variant}
        value={value}
        onChange={(value) => onChange && onChange(value)}
        allowClear={allowClear}
        showSearch={allowSearch}
        prefix={prefix}
        suffixIcon={suffixIcon}
        mode={mode}
        disabled={disabled}
        onClear={onClear}
        optionFilterProp="label"
        filterOption={
          allowSearch
            ? (input, option) =>
                String(option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
            : undefined
        }
        options={data.map((item) => ({
          label: item.label,
          value: item.value,
          // disabled: item.disabled,
        }))}
      />
    </div>
  );
};
