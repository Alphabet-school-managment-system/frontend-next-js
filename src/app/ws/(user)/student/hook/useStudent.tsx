import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { Sex } from "@/types/enums";
import { Icon } from "@iconify-icon/react";
import dayjs from "dayjs";

export const get_formatted_sex = (sex?: Sex) => {
  if (!sex) return <span className="text-sm">-</span>;

  const icon = sex === "Female" ? "mdi:gender-female" : "mdi:gender-male";

  return (
    <span className="text-sm inline-flex items-center gap-1">
      <Icon icon={icon} className="w-4 h-4" />
      {sex}
    </span>
  );
};

export const useStudent = () => {
  const getTableColumns = ({
    onClick,
  }: {
    onClick?: (parent: any) => void;
  }): any[] => {
    return [
      {
        title: "Name",
        dataIndex: "student",
        key: "student",
        render: (_: string, record: any) => (
          <UserProfileInfo
            full_name={`${record?.first_name} ${record?.middle_name} ${record?.last_name}`}
            photoUrl={record?.photoUrl}
            onClick={() => onClick && onClick(record)}
          />
        ),
      },
      {
        title: "Registration #",
        dataIndex: "student_registration_number",
        key: "student_registration_number",
        render: (val: number) => `STU-${String(val).padStart(6, "0")}`,
      },
      {
        title: "Sex",
        dataIndex: "sex",
        key: "sex",
        render: (val: Sex) => get_formatted_sex(val),
      },
      {
        title: "Date of Birth",
        dataIndex: "dob",
        key: "dob",
        render: (val: string) => (
          <span className="text-sm">
            {val ? dayjs(val).format("D MMM, YYYY") : "-"}
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
    ];
  };

  const getCommonFormFields = (
    showLastName: boolean,
    includeId: boolean = false,
  ): FieldConfig[] => {
    const fields = [
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
        name: "middle_name",
        label: "Middle Name",
        type: FieldType.Input,
        placeholder: "e.g. Doe",
        rules: [{ required: true, message: "" }],
      },
      ...(showLastName
        ? [
            {
              name: "last_name",
              label: "Last Name",
              type: FieldType.Input,
              placeholder: "e.g. Mark",
              rules: [{ required: true, message: "" }],
            },
          ]
        : []),
      {
        name: "sex",
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
        disabled: includeId,
        rules: [{ required: true, message: "" }],
      },
      {
        name: "branch_id",
        label: "",
        type: FieldType.Input,
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

  const getFormFields = ({
    image,
    includeId = false,
  }: {
    image: string;
    includeId?: boolean;
  }): FieldConfig[] => {
    return [
      ...getCommonFormFields(true, includeId),
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
        rules: [{ required: false, message: "" }],
      },
      {
        name: "image",
        label: "",
        type: FieldType.hidden,
        hidden: true,
        value: image,
      },
    ];
  };

  return {
    getTableColumns,
    getFormFields,
    getCommonFormFields,
  };
};
