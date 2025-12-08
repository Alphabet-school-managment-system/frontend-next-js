import UserProfileInfo from "@/components/common/UserProfileInfo";
import {
  FieldConfig,
  FieldType,
  SelectMode,
} from "@/components/forms/FormGenerator";
import { ColumnsType } from "antd/es/table";
import { Icon } from "@iconify-icon/react";
import { Student } from "@/types";
import { useState } from "react";

export const useEnrollment = () => {
  const [isTransferred, setIsTransferred] = useState<boolean>(false);

  const getTableColumns = (): ColumnsType<any> => {
    return [
      {
        title: "Full Name",
        dataIndex: "student",
        key: "student",
        render: (_: string, record: any) => (
          <UserProfileInfo
            full_name={`${record?.first_name} ${record?.middle_name} ${record?.last_name}`}
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
        title: "Class",
        dataIndex: "class_name",
        key: "class_name",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Section",
        dataIndex: "section_name",
        key: "section_name",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
    ];
  };

  const getFormFields = ({
    onStudentSelect,
  }: {
    onStudentSelect: (student: Student) => void;
  }): FieldConfig[] => {
    return [
      {
        name: "student_id",
        label: "Student",
        type: FieldType.searchInput,
        placeholder: "Select student",
        rules: [{ required: true, message: "" }],
        searchInputProps: {
          apiRoute: "student",
          placeholder: "Search student by name",
          queryKeys: ["first_name", "last_name"],
          onSelect: (value: any) => {
            onStudentSelect(value);
          },
        },
      },
      {
        name: "class",
        label: "Class (grade)",
        type: FieldType.Select,
        placeholder: "Select class",
        options: [],
        rules: [{ required: true, message: "" }],
        selectMode: SelectMode.tags,
      },
      {
        name: "isTransferred",
        label: "Transfer option",
        type: FieldType.checkbox,
        rules: [{ required: false, message: "" }],
        checkboxTypeProps: {
          onChange: (checked) => {
            setIsTransferred(checked);
          },
          checked: isTransferred,
          label: "Is the student transferred from other school?",
        },
      },
      {
        name: "transferredFrom",
        label: "Transferred from",
        type: FieldType.Input,
        disabled: isTransferred ? false : true,
        placeholder: "Enter previous school name transferred from",
        rules: [
          {
            required: isTransferred,
            message: "please enter the previous school name",
          },
        ],
      },
      {
        name: "note",
        label: "Note",
        type: FieldType.Textarea,
        placeholder: "Enter any additional notes",
        rows: 4,
        rules: [{ required: false, message: "" }],
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
