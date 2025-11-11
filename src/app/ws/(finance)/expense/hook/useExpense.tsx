import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import dayjs from "dayjs";

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
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
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
  }: {
    onFileChange: (fileList: any[]) => void;
  }): FieldConfig[] => {
    return [
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
        options: [
          { label: "Salary", value: "Salary" },
          { label: "Rent", value: "Rent" },
          { label: "Other", value: "Other" },
        ],
        rules: [{ required: true, message: "" }],
      },
      {
        name: "amount",
        label: "Amount",
        type: FieldType.number,
        placeholder: "Enter amount",
        min: 1,
        rules: [
          { required: true, message: "" },
          { min: 1, message: "Minimum amount must be 1" },
        ],
      },
      {
        name: "date",
        label: "Date",
        type: FieldType.Date,
        placeholder: "Select date when expense occurred",
        disabledDate: (current) => current > dayjs().endOf("day"),
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
    ];
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
