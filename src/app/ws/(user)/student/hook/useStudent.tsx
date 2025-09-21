import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { Icon } from "@iconify-icon/react";

export const useStudent = () => {
  const getTableColumns = (): any[] => {
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
            link={`/ws/student-detail/${record?.id}`}
          />
        ),
      },
      {
        title: "Full Name (Local language)",
        dataIndex: "full_name_local",
        key: "full_name_local",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Sex",
        dataIndex: "gender",
        key: "gender",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Date of Birth",
        dataIndex: "dob",
        key: "dob",
        render: (val: string) => (
          <span className="text-sm">
            {val ? new Date(val).toLocaleDateString() : "-"}
          </span>
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
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
    ];
  };

  const getCommonFormFields = (): FieldConfig[] => {
    return [
      {
        name: "first_name",
        label: "First Name",
        type: FieldType.Input,
        placeholder: "e.g. John",
        rules: [{ required: true, message: "" }],
        prefix: (
          <span className="flex items-center justify-center h-full">
            <Icon
              icon="material-symbols:person-outline"
              className="text-gray-500"
              width={22}
              height={22}
            />
          </span>
        ),
      },
      {
        name: "last_name",
        label: "Last Name",
        type: FieldType.Input,
        placeholder: "e.g. Doe",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "gender",
        label: "Sex",
        type: FieldType.Select,
        placeholder: "e.g. Male",
        prefix: (
          <span className="flex items-center justify-center h-full">
            <Icon
              icon="icons8:gender"
              className="text-gray-500"
              width={22}
              height={22}
            />
          </span>
        ),
        options: [
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ],
        rules: [{ required: true, message: "" }],
      },
      {
        name: "phone",
        label: "Phone Number",
        type: FieldType.Phone,
        rules: [{ required: true, message: "" }],
      },
      {
        name: "email",
        label: "Email",
        type: FieldType.email,
        placeholder: "e.g. someone@example.com",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "branch_id",
        label: "",
        type: FieldType.Input,
        hidden: true,
      },
    ];
  };

  const getFormFields = (): FieldConfig[] => {
    return [
      ...getCommonFormFields(),
      {
        name: "full_name_local",
        label: "Full Name (Local)",
        type: FieldType.Input,
        placeholder: "e.g. አበበ ከበደ",
        rules: [{ required: true, message: "" }],
        prefix: (
          <span className="flex items-center justify-center h-full">
            <Icon
              icon="famicons:language"
              className="text-gray-500"
              width={22}
              height={22}
            />
          </span>
        ),
      },
      {
        name: "dob",
        label: "Date of Birth",
        type: FieldType.Date,
        rules: [{ required: true, message: "" }],
        suffix: (
          <span className="flex items-center justify-center h-full">
            <Icon
              icon="picon:birthday"
              className="text-gray-500"
              width={22}
              height={22}
            />
          </span>
        ),
        placeholder: "Select date of birth",
      },
      {
        name: "address",
        label: "Address",
        type: FieldType.Textarea,
        placeholder: "1234, Main St, City, Country",
        rules: [{ required: true, message: "" }],
        rows: 4,
        className: `w-full`,
      },
      {
        name: "note",
        label: "Note",
        type: FieldType.Textarea,
        placeholder: "additional information about the student",
        rows: 4,
        className: `w-full`,
      },
    ];
  };

  return {
    getTableColumns,
    getFormFields,
    getCommonFormFields,
  };
};
