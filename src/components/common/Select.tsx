import { Select as MainSelect } from "antd";

type selectType = { text: string; value: string };

export const Select = ({
  data,
  placeholderText,
  onChange,
  classNames,
  variant = "outlined",
  value,
  allowClear = false,
}: {
  data: selectType[];
  placeholderText?: string;
  onChange: (value: any) => void;
  classNames?: string;
  variant?: "outlined" | "filled" | "borderless" | "underlined";
  value?: string;
  allowClear?: boolean;
}) => {
  const { Option } = MainSelect;

  return (
    <div className="flex justify-end">
      <MainSelect
        placeholder={placeholderText}
        size="large"
        className={`${classNames} !cursor-pointer`}
        onChange={onChange}
        variant={variant}
        value={value}
        allowClear={allowClear}
      >
        {data.map((item: selectType) => (
          <Option key={item?.value} value={item?.value}>
            {item?.text}
          </Option>
        ))}
      </MainSelect>
    </div>
  );
};
