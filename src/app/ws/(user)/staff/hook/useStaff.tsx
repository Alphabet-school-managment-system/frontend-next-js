import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { Icon } from "@iconify-icon/react";

export const useStaff = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Full Name",
        dataIndex: "staff",
        key: "staff",
        render: (_: string, record: any) => (
          <UserProfileInfo
            full_name={`${record?.first_name} ${record?.middle_name} ${record?.last_name}`}
            photoUrl={record?.photoUrl}
            link={`/ws/staff-detail/${record?.id}`}
          />
        ),
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },

      {
        title: "Phone #",
        dataIndex: "phone",
        key: "phone",
        render: (_: string, record: any) => (
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:phone"
              width={20}
              height={20}
              className="text-gray-700"
            />
            <span className="text-sm">{record?.phone || "-"}</span>
          </div>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (val: string) => (
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:email"
              width={20}
              height={20}
              className="text-gray-700"
            />
            <span className="text-sm">{val || "-"}</span>
          </div>
        ),
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
    ];
  };

  const getFormFields = (): FieldConfig[] => {
    return [
      {
        name: "role",
        label: "Role",
        type: FieldType.Select,
        placeholder: "Select role",
        options: [
          { label: "Librarian", value: "librarian" },
          { label: "Accountant", value: "accountant" },
          { label: "Admin", value: "admin" },
        ],
        rules: [{ required: true, message: "" }],
      },
    ];
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
