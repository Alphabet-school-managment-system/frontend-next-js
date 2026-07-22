import { useTeacher } from "@/app/ws/(user)/teacher/hook/useTeacher";
import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { useUtils } from "@/hooks/useUtils";
import {
  levels_of_education,
  selectType,
  Setting,
  stream,
  Teacher,
} from "@/types";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";

export const useTimetable = ({
  SchoolSetting,
}: {
  SchoolSetting?: Setting;
}) => {
  const {
    getSections,
    getPeriods,
    getDaysOfWeek,
    getFormattedIds,
    get_speciality_label,
  } = useUtils();

  const getTableColumns = (): any[] => [
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
      render: (_: string, record: any) => (
        <UserProfileInfo
          full_name={`${record?.teacher?.first_name} ${record?.teacher?.middle_name}`}
          photoUrl={record?.teacher?.photoUrl}
          subTitle={getFormattedIds(
            String(record?.teacher?.teacher_registration_number),
            "TEA",
          )}
          link={undefined}
        />
      ),
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      render: (val: string) => (
        <span className="text-sm p-2 rounded-md uppercase">
          {getDaysOfWeek?.()?.find((item: selectType) => item?.value === val)?.label || "-"}
        </span>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (val: string) => (
        <span className="text-sm p-2 rounded-md uppercase">
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
    SearchInputOptions,
    onGradeSelect,
    data,
  }: {
    onTeacherSelect: (student: Teacher) => void;
    onSearchClear: () => void;
    includeId?: boolean;
    levels_of_education: levels_of_education[];
    SearchInputOptions?: Teacher[];
    onGradeSelect?: (value: string) => void;
    data?: any;
  }): FieldConfig[] => {
    type fieldOptionType = {
      show: {
        subject: boolean;
        stream: boolean;
      };
      selectedValue: {
        grade: string;
        stream: stream | undefined;
      };
    };
    const [fieldOption, setFieldOption] = useState<fieldOptionType | undefined>(
      undefined,
    );

    useEffect(() => {
      if (data) {
        setFieldOption((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            show: {
              stream: data?.stream ? true : false,
              subject: true,
            },
            selectedValue: {
              grade: data?.grade,
              stream: data?.stream,
            },
          };
        });
      }
    }, [data]);

    const { getGrades, getSubjectsForEnrollment, getStreams, getGradeDetail } =
      useUtils();

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
          onChange: async (value: string) => {
            let hasStream = getGradeDetail({ value })?.hasStream;

            setFieldOption((prev) => {
              if (!prev) return prev;

              return {
                ...prev,
                show: {
                  stream: hasStream ?? false,
                  subject: !hasStream,
                },
                selectedValue: {
                  ...prev.selectedValue,
                  grade: value,
                },
              };
            });

            onGradeSelect && onGradeSelect(value);
          },
          allowSearch: true,
        },
        options: getGrades({ returnSingleValue: true }),
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
      ...(fieldOption?.show?.stream
        ? [
            {
              name: "stream",
              label: "Stream",
              type: FieldType.Select,
              placeholder: "Select Stream",
              selectProps: {
                onChange: (value: string) => {
                  setFieldOption((prev) => {
                    if (!prev) return prev;

                    return {
                      ...prev,
                      show: {
                        ...prev.show,
                        subject: true,
                      },
                      selectedValue: {
                        ...prev.selectedValue,
                        stream: value as stream,
                      },
                    };
                  });
                },
              },
              options: getStreams(),
              rules: [{ required: true, message: "" }],
            },
          ]
        : []),
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
      ...(fieldOption?.show?.subject
        ? [
            {
              name: "subject",
              label: "Subject",
              type: FieldType.Select,
              placeholder: "e.g. Mathematics, Biology",
              options: getSubjectsForEnrollment(
                fieldOption?.selectedValue?.grade,
                fieldOption?.selectedValue?.stream,
              ),
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
              selectProps: {
                allowSearch: true,
              },
            },
          ]
        : []),
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
