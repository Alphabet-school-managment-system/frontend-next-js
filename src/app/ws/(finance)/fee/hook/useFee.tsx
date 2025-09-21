import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { Icon } from "@iconify-icon/react";

export const useFee = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Student Name",
        dataIndex: "student",
        key: "student",
        render: (_: string, record: any) => (
          <UserProfileInfo
            first_name={record?.first_name}
            last_name={record?.last_name}
            photoUrl={record?.photoUrl}
            link={`/ws/student-detail/${record?.id}`}
          />
        ),
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
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

  const getFormFields = (): FieldConfig[] => {
    return [
      {
        name: "student_id",
        label: "Student",
        type: FieldType.Select,
        placeholder: "Select the student",
        rules: [{ required: false, message: "" }],
        options: [],
      },
      {
        name: "amount",
        label: "Amount",
        type: FieldType.number,
        placeholder: "Enter fee amount",
        min: 1,
        rules: [
          { required: true, message: "" },
          {
            min: 1,
            message: "Minimum amount have to be 1",
          },
        ],
      },
      {
        name: "due_date",
        label: "Due Date",
        type: FieldType.Date,
        placeholder: "",
        rules: [{ required: false, message: "" }],
      },
      {
        name: "status",
        label: "Status",
        type: FieldType.Select,
        placeholder: "Select status",
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
        options: [
          { label: "Tuition", value: "Tuition" },
          { label: "Exam", value: "Exam" },
          { label: "Other", value: "Other" },
        ],
        rules: [{ required: true, message: "" }],
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
    ];
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
