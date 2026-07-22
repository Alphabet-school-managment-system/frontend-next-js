import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { Icon } from "@iconify-icon/react";
import { get_formatted_sex } from "../../student/hook/useStudent";
import { Sex } from "@/types/enums";
import { levels_of_education, stream } from "@/types";
import { useUtils } from "@/hooks/useUtils";

export const useTeacher = () => {
  const subjectOptions: {
    label: string;
    value: string;
    Stream: stream;
    enable: boolean;
    levels_of_education: levels_of_education[];
  }[] = [
    {
      label: "Mother Tongue Language",
      value: "mother_tongue_language",
      Stream: "General",
      enable: true,
      levels_of_education: [
        "kg",
        "lower_primary",
        "middle_primary",
        "upper_primary",
      ],
    },
    {
      label: "Amharic language",
      value: "amharic_language",
      Stream: "General",
      enable: true,
      levels_of_education: ["middle_primary", "upper_primary", "secondary"],
    },
    {
      label: "Physics",
      value: "physics",
      Stream: "Natural_Sciences",
      enable: true,
      levels_of_education: ["upper_primary", "secondary", "college_prep"],
    },
    {
      label: "Chemistry",
      value: "chemistry",
      Stream: "Natural_Sciences",
      enable: true,
      levels_of_education: ["upper_primary", "secondary", "college_prep"],
    },
    {
      label: "Biology",
      value: "biology",
      Stream: "Natural_Sciences",
      enable: true,
      levels_of_education: ["upper_primary", "secondary", "college_prep"],
    },
    {
      label: "History",
      value: "history",
      Stream: "Social_Sciences",
      enable: true,
      levels_of_education: ["secondary", "college_prep"],
    },
    {
      label: "Geography",
      value: "geography",
      Stream: "Social_Sciences",
      enable: true,
      levels_of_education: ["secondary", "college_prep"],
    },
    {
      label: "Economics",
      value: "economics",
      Stream: "Social_Sciences",
      enable: true,
      levels_of_education: ["college_prep"],
    },
    {
      label: "Business Studies",
      value: "business_studies",
      Stream: "Social_Sciences",
      enable: true,
      levels_of_education: ["college_prep"],
    },
    {
      label: "Technical Drawing",
      value: "technical_drawing",
      Stream: "Natural_Sciences",
      enable: true,
      levels_of_education: ["college_prep"],
    },

    {
      label: "Mathematics",
      value: "mathematics",
      Stream: "General",
      enable: true,
      levels_of_education: [
        "kg",
        "lower_primary",
        "middle_primary",
        "upper_primary",
        "secondary",
        "college_prep",
      ],
    },
    {
      label: "English",
      value: "english",
      Stream: "General",
      enable: true,
      levels_of_education: [
        "kg",
        "lower_primary",
        "middle_primary",
        "upper_primary",
        "secondary",
        "college_prep",
      ],
    },
    {
      label: "Citizenship Education",
      value: "citizenship_education",
      Stream: "General",
      enable: true,
      levels_of_education: [
        "middle_primary",
        "upper_primary",
        "secondary",
        "college_prep",
      ],
    },
    {
      label: "Physical Education (PE)",
      value: "physical_education",
      Stream: "General",
      enable: true,
      levels_of_education: [
        "lower_primary",
        "middle_primary",
        "upper_primary",
        "secondary",
      ],
    },
    {
      label: "Information Technology (IT)",
      value: "information_technology",
      Stream: "General",
      enable: true,
      levels_of_education: ["upper_primary", "secondary", "college_prep"],
    },

    {
      label: "Performing and Visual Arts (PVA)",
      value: "performing_and_visual_arts",
      Stream: "General",
      enable: true,
      levels_of_education: ["lower_primary", "middle_primary"],
    },
    {
      label: "Environmental Science",
      value: "environmental_science",
      Stream: "General",
      enable: true,
      levels_of_education: ["lower_primary"],
    },
    {
      label: "Social Studies",
      value: "social_studies",
      Stream: "General",
      enable: true,
      levels_of_education: ["middle_primary", "upper_primary"],
    },
    {
      label: "General Science",
      value: "general_science",
      Stream: "General",
      enable: true,
      levels_of_education: ["middle_primary"],
    },
  ];

  const get_speciality_label = (value: string): string => {
    return subjectOptions.find((s) => s.value === value)?.label ?? "Unknown";
  };

  const { getFormattedIds } = useUtils();

  const getTableColumns = ({
    onClick,
  }: {
    onClick?: (parent: any) => void;
  }): any[] => {
    return [
      {
        title: "Name",
        dataIndex: "teacher",
        key: "teacher",
        render: (_: string, record: any) => (
          <UserProfileInfo
            full_name={`${record?.first_name} ${record?.middle_name}`}
            photoUrl={record?.photoUrl}
            onClick={() => onClick && onClick(record)}
          />
        ),
      },
      {
        title: "Registration #",
        dataIndex: "teacher_registration_number",
        key: "teacher_registration_number",
        render: (val: number) => getFormattedIds(String(val), "TEA"),
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
          <div className="flex items-center gap-2 rounded-md bg-gray-200 w-fit py-1 px-2">
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
