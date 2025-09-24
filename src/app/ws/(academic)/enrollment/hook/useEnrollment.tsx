import UserProfileInfo from "@/components/common/UserProfileInfo";
import {
  FieldConfig,
  FieldType,
  SelectMode,
} from "@/components/forms/FormGenerator";
import { ColumnsType } from "antd/es/table";
import { Icon } from "@iconify-icon/react";

export const useEnrollment = () => {
  const getTableColumns = (): ColumnsType<any> => {
    return [
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
        render: (_: string, record: any) => {
          return (
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:email"
                width={20}
                height={20}
                className="text-gray-700"
              />
              <span className="text-sm">{record?.email || "-"}</span>
            </div>
          );
        },
      },
      {
        title: "Class name",
        dataIndex: "class_name",
        key: "class_name",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Section name",
        dataIndex: "section_name",
        key: "section_name",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
    ];
  };

  const getFormFields = (): FieldConfig[] => {
    return [
      {
        name: "student_id",
        label: "Class",
        type: FieldType.Select,
        placeholder: "Select student",
        options: [],
        rules: [{ required: true, message: "" }],
      },
      {
        name: "student_id",
        label: "Class (and section)",
        type: FieldType.Select,
        placeholder: "Select class & sec",
        options: [],
        rules: [{ required: true, message: "" }],
        selectMode: SelectMode.multiple,
      },
      {
        name: "academic_year_id",
        label: "",
        type: FieldType.Input,
        hidden: true,
      },
    ];
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
