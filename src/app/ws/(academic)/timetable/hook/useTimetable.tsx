import { useTeacher } from "@/app/ws/(user)/teacher/hook/useTeacher";
import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { useUtils } from "@/hooks/useUtils";
import { levels_of_education, selectType, Setting, Teacher } from "@/types";
import { Icon } from "@iconify-icon/react";

const { get_speciality_label, subjectOptions } = useTeacher();
export const useTimetable = ({
  SchoolSetting,
}: {
  SchoolSetting?: Setting;
}) => {
  const { getSections, getPeriods, getDaysOfWeek } = useUtils();
  

  const getTableColumns = (): any[] => [
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
      render: (_: string, record: any) => (
        <UserProfileInfo
          full_name={`${record?.teacher?.first_name} ${record?.teacher?.middle_name}`}
          photoUrl={record?.teacher?.photoUrl}
          link={`/ws/teacher-detail/${record?.teacher?.id}`}
        />
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (val: string) => (
        <span className="text-sm p-2 rounded-md bg-gray-300 text-gray-800 uppercase">
          {get_speciality_label(val) || "-"}
        </span>
      ),
    },
    {
      title: "Period",
      dataIndex: "period",
      key: "period",
      render: (v: number) => <span className="text-sm">{v}</span>,
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
      render: (v: string) => <span className="text-sm">{v || "-"}</span>,
    },
  ];

  const getFormFields = ({
    onTeacherSelect,
    onSearchClear,
    includeId = false,
    levels_of_education,
    getGrades,
    SearchInputOptions,
  }: {
    onTeacherSelect: (student: Teacher) => void;
    onSearchClear: () => void;
    includeId?: boolean;
    levels_of_education: levels_of_education[];
    getGrades: () => selectType[];
    SearchInputOptions?: Teacher[];
  }): FieldConfig[] => {
    const fields: FieldConfig[] = [
      {
        name: "academic_year_id",
        label: "Academic Year",
        type: FieldType.hidden,
        hidden: true,
      },
      {
        name: "term",
        label: "Term",
        type: FieldType.hidden,
        hidden: true,
      },
      {
        name: "grade",
        label: "Grade (Class)",
        type: FieldType.Select,
        placeholder: "e.g. Grade 1",
        selectProps: {
          onChange(value) {
            console.log("Selected grade:", value);
          },
        },
        options: getGrades(),
        prefix: (
          <span className="flex items-center justify-center h-full">
            <Icon
              icon="material-symbols:grade"
              className="text-gray-500"
              width={22}
              height={22}
            />
          </span>
        ),
        rules: [{ required: true, message: "" }],
      },
      {
        name: "section",
        label: "Section",
        type: FieldType.Select,
        options: getSections(),
        placeholder: "e.g. Section 1",
        prefix: (
          <span className="flex items-center justify-center h-full">
            <Icon
              icon="tabler:section"
              className="text-gray-500"
              width={22}
              height={22}
            />
          </span>
        ),
        rules: [{ required: true, message: "" }],
      },
      {
        name: "subject",
        label: "Subject",
        type: FieldType.Select,
        placeholder: "e.g. Mathematics, Biology",
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
        name: "teacher_id",
        label: "Teacher",
        type: FieldType.searchInput,
        placeholder: "Select teacher",
        rules: [{ required: true, message: "" }],
        searchInputProps: {
          apiRoute: "teacher",
          placeholder: "Search teacher by name",
          queryKeys: ["first_name", "middle_name"],
          onSelect: (value: any) => {
            onTeacherSelect(value);
          },
          onClear: () => {
            onSearchClear();
          },
          incomingOptions: SearchInputOptions,
        },
      },
      {
        name: "day",
        label: "Day",
        placeholder: "e.g. Monday",
        type: FieldType.Select,
        options: getDaysOfWeek(),
        prefix: (
          <span className="flex items-center justify-center h-full">
            <Icon
              icon="lucide:calendar-days"
              className="text-gray-500"
              width={22}
              height={22}
            />
          </span>
        ),
        rules: [{ required: true, message: "" }],
      },
      {
        name: "period",
        label: "Period",
        placeholder: "e.g. Period 1",
        type: FieldType.Select,
        options: getPeriods(SchoolSetting?.periods_per_day || 8),
        prefix: (
          <span className="flex items-center justify-center h-full">
            <Icon
              icon="mingcute:time-fill"
              className="text-gray-500"
              width={22}
              height={22}
            />
          </span>
        ),
        selectProps: {
          onChange(value) {
            console.log("Selected period:", value);
          },
        },
        rules: [{ required: true, message: "" }],
      },
      {
        name: "note",
        label: "Note",
        type: FieldType.Textarea,
        placeholder: "Add extra note here.",
        className: "!w-full",
        rows: 3,
        rules: [{ required: false }],
      },
    ];

    if (includeId) {
      fields.unshift({
        name: "id",
        label: "id",
        type: FieldType.hidden,
        hidden: true,
      });
      ``;
    }

    return fields;
  };

  return {
    getTableColumns,
    getFormFields,
    getDaysOfWeek,
    getPeriods,
  };
};
