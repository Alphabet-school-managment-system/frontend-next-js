import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { Icon } from "@iconify-icon/react";

export const useParent = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Full Name",
        dataIndex: "parent",
        key: "parent",
        render: (_: string, record: any) => (
          <UserProfileInfo
            full_name={`${record?.first_name} ${record?.middle_name} ${record?.last_name}`}
            photoUrl={record?.photoUrl}
            link={`/ws/parent-detail/${record?.id}`}
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
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
    ];
  };

  const getFormFields = (): FieldConfig[] => {
    return [
      {
        name: "address",
        label: "Address",
        type: FieldType.Textarea,
        placeholder: "Enter address",
        rules: [{ required: true, message: "" }],
        rows: 4,
        className: `w-full`,
      },
      {
        name: "note",
        label: "Note",
        type: FieldType.Textarea,
        placeholder: "Add extra note here.",
        rows: 4,
        className: `w-full`,
        rules: [{ required: false, message: "" }],
      },
    ];
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
