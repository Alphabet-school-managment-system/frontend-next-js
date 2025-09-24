import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import dayjs from "dayjs";

export const useBehavior = () => {
  const getTableColumns = (): any[] => [
    {
      title: "Full Name",
      dataIndex: "student",
      key: "student",
      render: (_: string, record: any) => (
        <UserProfileInfo
          first_name={record?.first_name}
          last_name={record?.last_name}
          photoUrl={record?.photoUrl}
          link={`/ws/student/${record?.id}/detail`}
        />
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (val: string) => (
        <span className="text-sm">
          {val ? dayjs(val).format("YYYY-MM-DD") : "-"}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (val: string) => <span className="text-sm">{val || "-"}</span>,
    },
  ];

  const getFormFields = (): FieldConfig[] => [
    {
      name: "student_id",
      label: "Student",
      type: FieldType.Select,
      placeholder: "Select student",
      rules: [{ required: true, message: "" }],
      options: [],
    },
    {
      name: "date",
      label: "Date",
      type: FieldType.Date,
      placeholder: "Select date",
      rules: [{ required: true, message: "" }],
      disabledDate: (current) => current > dayjs().endOf("day"),
      className: `!w-full`,
    },
    {
      name: "type",
      label: "Behavior Type",
      type: FieldType.Select,
      placeholder: "Select behavior type",
      rules: [{ required: true, message: "" }],
      options: [
        { label: "Positive", value: "positive" },
        { label: "Negative", value: "negative" },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: FieldType.Textarea,
      placeholder: "Describe the behavior",
      rows: 4,
      className: `w-full`,
    },
  ];

  return {
    getTableColumns,
    getFormFields,
  };
};
