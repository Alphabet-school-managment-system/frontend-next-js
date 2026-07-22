import {
  FieldConfig,
  FieldType,
} from "@/components/forms/FormGenerator";
import dayjs from "dayjs";

export const enum ExpenseType {
  Salary = "Salary",
  Rent = "Rent",
  Other = "Other",
}

export const ExpenseTypeOptions = [
  { label: "Salary", value: "Salary" },
  { label: "Rent", value: "Rent" },
  { label: "Other", value: "Other" },
];

export const useExpense = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (value: number) => {
          const num = Number(value);
          return (
            <span className="text-sm font-semibold">
              {isNaN(num)
                ? num
                : num.toLocaleString("en-US", {
                    style: "currency",
                    currency: "ETB",
                    minimumFractionDigits: 2,
                  }) || "-"}
            </span>
          );
        },
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "When",
        dataIndex: "date",
        key: "date",
        render: (val: string) => (
          <span className="text-sm">
            {val ? new Date(val).toLocaleDateString() : "-"}
          </span>
        ),
      },
      {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
        render: (val: string) => (
          <span className="text-sm">
            {val ? new Date(val).toLocaleDateString() : "-"}
          </span>
        ),
      },
    ];
  };

  const getFormFields = ({
    onFileChange,
    onTypeChange,
    type,
    other_type,
    onOtherTypeChange,
    includeId = false,
  }: {
    onFileChange: (fileList: any[]) => void;
    onTypeChange: (value: ExpenseType) => void;
    type?: ExpenseType;
    other_type?: string;
    onOtherTypeChange?: (e: any) => void;
    includeId?: boolean;
  }): FieldConfig[] => {
    const fields = [
      {
        name: "title",
        label: "Title",
        type: FieldType.Input,
        placeholder: "e.g. payment for teachers",
        className: "w-full",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "description",
        label: "Description",
        type: FieldType.Textarea,
        placeholder: "Enter expense description",
        rows: 3,
        className: "w-full",
        rules: [{ required: false, message: "" }],
      },
      {
        name: "type",
        label: "Type",
        type: FieldType.Select,
        placeholder: "Select type",
        value: type || "",
        options: ExpenseTypeOptions,
        selectProps: {
          onChange: (value: ExpenseType) => {
            onTypeChange(value);
          },
        },
        rules: [{ required: true, message: "" }],
      },
      {
        name: "amount",
        label: "Amount",
        type: FieldType.number,
        placeholder: "Enter amount",
        value: 1,
        min: 1,
        rules: [{ required: true, message: "" }],
      },
      {
        name: "other_type",
        label: "Specify Type",
        type: FieldType.Input,
        placeholder: "Specify expense type",
        className: "w-full",
        value: other_type || "",
        rules: [{ required: type === ExpenseType.Other, message: "" }],
        disabled: type !== ExpenseType.Other,
        onChange: onOtherTypeChange,
        allowClear: true,
      },
      {
        name: "date",
        label: "Date",
        type: FieldType.Date,
        placeholder: "Select date when expense occurred",
        disabledDate: (current: any) => current > dayjs().endOf("day"),
        rules: [{ required: true, message: "" }],
      },
      {
        name: "receipt",
        label: "Receipt",
        type: FieldType.file,
        placeholder: "Upload receipt",
        rules: [{ required: false, message: "" }],
        fileTypeProps: {
          maxCount: 1,
          accept: ".jpg,.jpeg,.png",
          onChange: (fileList: any[]) => {
            onFileChange(fileList);
          },
        },
      },
      {
        name: "academic_year_id",
        label: "",
        type: FieldType.hidden,
        placeholder: "",
        rules: [{ required: false, message: "" }],
        hidden: true,
      },
    ];

    if (includeId) {
      return [
        {
          name: "id",
          label: "",
          type: FieldType.hidden,
          placeholder: "",
          rules: [{ required: false, message: "" }],
          hidden: true,
        },
        ...fields,
      ];
    } else {
      return fields;
    }
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
