import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import dayjs from "dayjs";

export const enum FeeType {
  Tuition = "Tuition",
  Exam = "Exam",
  Other = "Other",
}

export const FeeTypeOptions = [
  { label: "Tuition", value: "Tuition" },
  { label: "Exam", value: "Exam" },
  { label: "Other", value: "Other" },
];

export const useFee = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Student Name",
        dataIndex: "student",
        key: "student",
        render: (_: string, record: any) => (
          <UserProfileInfo
            full_name={`${record?.first_name} ${record?.middle_name} ${record?.last_name}`}
            photoUrl={record?.photoUrl}
            link={`/ws/student-detail/${record?.id}`}
          />
        ),
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
        title: "Due Date",
        dataIndex: "due_date",
        key: "due_date",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
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
    onTypeChange: (value: FeeType) => void;
    type?: FeeType;
    other_type?: string;
    onOtherTypeChange?: (e: any) => void;
    includeId?: boolean;
  }): FieldConfig[] => {
    const fields = [
      {
        name: "student_id",
        label: "Student",
        type: FieldType.searchInput,
        placeholder: "Select the student",
        rules: [{ required: true, message: "" }],
        searchInputProps: {
          apiRoute: "student",
          placeholder: "Search student by name",
          queryKeys: ["first_name", "last_name"],
          onSelect: (value: string) => {},
        },
      },
      {
        name: "amount",
        label: "Amount",
        type: FieldType.number,
        placeholder: "Enter fee amount",
        value: 1,
        min: 1,
        rules: [{ required: true, message: "" }],
      },
      {
        name: "due_date",
        label: "Due Date",
        type: FieldType.Date,
        placeholder: "",
        rules: [{ required: false, message: "" }],
        disabledDate: (current: any) => current > dayjs().endOf("day"),
      },
      {
        name: "status",
        label: "Status",
        type: FieldType.Select,
        placeholder: "Select status",
        value: "Paid",
        options: [
          { label: "Paid", value: "Paid" },
          { label: "Unpaid", value: "Unpaid" },
        ],
        rules: [{ required: true, message: "" }],
      },
      {
        name: "type",
        label: "Type",
        type: FieldType.Select,
        placeholder: "Select type",
        options: FeeTypeOptions,
        selectProps: {
          onChange: (value: FeeType) => {
            onTypeChange(value);
          },
        },
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
        name: "other_type",
        label: "Specify Type",
        type: FieldType.Input,
        placeholder: "Specify expense type",
        className: "w-full",
        value: other_type || "",
        rules: [{ required: type === FeeType.Other, message: "" }],
        disabled: type !== FeeType.Other,
        onChange: onOtherTypeChange,
        allowClear: true,
      },
      {
        name: "note",
        label: "Note",
        type: FieldType.Textarea,
        placeholder: "Additional information about the fee",
        rows: 4,
        className: "w-full",
        rules: [{ required: false, message: "" }],
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
