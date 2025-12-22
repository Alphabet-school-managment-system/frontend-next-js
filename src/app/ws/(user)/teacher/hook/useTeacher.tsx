import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { Icon } from "@iconify-icon/react";
import { get_formatted_sex } from "../../student/hook/useStudent";
import { Sex } from "@/types/enums";

export const useTeacher = () => {
  const subjectOptions = [
    { label: "Local language", value: "Local_language" },
    { label: "Mathematics", value: "mathematics" },
    { label: "Physics", value: "physics" },
    { label: "Chemistry", value: "chemistry" },
    { label: "Biology", value: "biology" },
    { label: "English", value: "english" },
    { label: "History", value: "history" },
    { label: "Geography", value: "geography" },
    { label: "Computer Science", value: "computer_science" },
    { label: "Economics", value: "economics" },
    { label: "Business Studies", value: "business_studies" },
    { label: "Civics", value: "civics" },
    { label: "Physical Education", value: "physical_education" },
    { label: "Music", value: "music" },
    { label: "Art", value: "art" },
    { label: "Religious Studies", value: "religious_studies" },
    { label: "Environmental Science", value: "environmental_science" },
    { label: "Social Studies", value: "social_studies" },
    { label: "Philosophy", value: "philosophy" },
    { label: "Political Science", value: "political_science" },
    { label: "Special Education", value: "special_education" },
    { label: "Other", value: "other" },
  ];

  const get_speciality_label = (value: string): string => {
    return subjectOptions.find((s) => s.value === value)?.label ?? "Unknown";
  };

  const getTableColumns = (): any[] => {
    return [
      {
        title: "Name",
        dataIndex: "teacher",
        key: "teacher",
        render: (_: string, record: any) => (
          <UserProfileInfo
            full_name={`${record?.first_name} ${record?.middle_name}`}
            photoUrl={record?.photoUrl}
            link={`/ws/teacher-detail/${record?.id}`}
          />
        ),
      },
      {
        title: "Registration #",
        dataIndex: "teacher_registration_number",
        key: "teacher_registration_number",
        render: (val: number) => `TEA-${String(val).padStart(6, "0")}`,
      },
      {
        title: "Sex",
        dataIndex: "sex",
        key: "sex",
        render: (val: Sex) => get_formatted_sex(val),
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
        title: "Subject Specialization",
        dataIndex: "subject_specialization",
        key: "subject_specialization",
        render: (val: string) => (
          <span className="text-sm p-2 rounded-md bg-gray-300 text-gray-800 uppercase">
            {get_speciality_label(val) || "-"}
          </span>
        ),
      },
    ];
  };

  const getFormFields = ({ image }: { image: string }): FieldConfig[] => {
    return [
      {
        name: "subject_specialization",
        label: "Subject Specialization",
        type: FieldType.Select,
        placeholder: "Select subject specialization",
        options: subjectOptions,
        rules: [{ required: true, message: "" }],
        prefix: (
          <span className="flex items-center justify-center h-full">
            <Icon
              icon="material-symbols:subject"
              className="text-gray-500"
              width={22}
              height={22}
            />
          </span>
        ),
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
    subjectOptions,
    get_speciality_label,
  };
};
