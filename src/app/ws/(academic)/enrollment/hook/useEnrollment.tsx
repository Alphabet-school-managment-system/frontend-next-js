import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { AcademicYear, levels_of_education, Setting, Student } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useApiQuery } from "@/hooks/useApi";
import { IdsType } from "@/store/idsContext";
import dayjs from "dayjs";
import { useUtils } from "@/hooks/useUtils";
import { columnType } from "@/components/list";

export const useEnrollment = ({ Ids }: { Ids: IdsType }) => {
  const { data: AcademicYear, isLoading: gettingAcademicYear } =
    useApiQuery<AcademicYear>(
      [`academic-year/${Ids?.branchId}`],
      `academic-year/${Ids?.branchId}`,
      Ids?.branchId ? true : false,
    );

  const { data: SchoolSetting, isLoading: gettingSchoolSetting } =
    useApiQuery<Setting>(
      [`setting/${Ids?.schoolId}`],
      `setting/${Ids?.schoolId}`,
      Ids?.schoolId ? true : false,
    );

  const { data: ServerDate, isLoading: gettingServerDate } = useApiQuery<any>(
    [`util/server-date`],
    `util/server-date`,
  );

  const isEnrollmentPeriodExpired = (): {
    message: string;
    status: boolean;
  } => {
    if (AcademicYear && ServerDate) {
      const current = dayjs(ServerDate);
      const start = dayjs(AcademicYear.enrollment_start);
      const end = dayjs(AcademicYear.enrollment_end);

      const result =
        (current.isAfter(start, "day") || current.isSame(start, "day")) &&
        (current.isBefore(end, "day") || current.isSame(end, "day"));

      if (!result) {
        return {
          message: `Enrollment period has expired. Enrollment is allowed from ${dayjs(
            AcademicYear.enrollment_start,
          ).format("MMM DD, YYYY")} to ${dayjs(
            AcademicYear.enrollment_end,
          ).format("MMM DD, YYYY")}.`,
          status: true,
        };
      }
    }

    return { message: "", status: false };
  };

  const getTableColumns = (): columnType[] => {
    const { getGradeLabel, getFormattedIds } = useUtils();

    return [
      {
        title: "Full Name",
        dataIndex: "student",
        key: "student",
        render: (_: string, record: any) => (
          <UserProfileInfo
            full_name={`${record?.student?.first_name} ${record?.student?.middle_name} ${record?.student?.last_name}`}
            subTitle={getFormattedIds(
              record?.student?.student_registration_number,
            )}
            photoUrl={record?.student?.photoUrl}
            link={undefined}
          />
        ),
      },
      {
        title: "Grade (Class)",
        dataIndex: "grade",
        key: "grade",
        render: (val: string, record: any) => (
          <span className="text-sm">
            {getGradeLabel(Number(record?.grade)) || "-"}
          </span>
        ),
      },
      {
        title: "Section",
        dataIndex: "section",
        key: "section",
        render: (val: string) => (
          <span className="text-sm">{val || "Not Assigned"}</span>
        ),
      },
      {
        title: "Stream",
        dataIndex: "stream",
        key: "stream",
        render: (val: string) => (
          <span className="text-sm border px-2 py-1 rounded bg-amber-50">
            {val?.replace(/_/g, " ") || "N/A"}
          </span>
        ),
      },
      {
        title: "Transferred From (school or branch)",
        dataIndex: "transferredFrom",
        key: "transferredFrom",
        render: (val: string) => (
          <span className="text-sm">{val || "-- Not Transferd --"}</span>
        ),
      },
    ];
  };

  const getFormFields = ({
    onStudentSelect,
    onGradeSelect,
    onClear,
    levels_of_education,
    includeId = false,
    isTransferredValue = false,
    onStreamSelect = () => {},
    SearchInputOptions,
    showStreamField,
    onIsTransferredValueChange = (value: boolean) => {},
  }: {
    onStudentSelect: (student: Student) => void;
    onGradeSelect: (value: string) => void;
    onClear: () => void;
    levels_of_education: levels_of_education[];
    includeId?: boolean;
    isTransferredValue?: boolean;
    onStreamSelect?: (stream: string) => void;
    SearchInputOptions?: Student[];
    showStreamField?: boolean;
    onIsTransferredValueChange?: (value: boolean) => void;
  }): FieldConfig[] => {
    const [isTransferred, setIsTransferred] = useState<boolean>(false);
    const [showStreamFieldOption, setShowStreamFieldOption] =
      useState<boolean>(false);

    const { getGrades, getStreams, getGradeDetail } = useUtils();

    useEffect(() => {
      showStreamField && setShowStreamFieldOption(showStreamField);
    }, [showStreamField]);

    useEffect(() => {
      setIsTransferred(isTransferredValue);
    }, [isTransferredValue]);

    const fields = [
      {
        name: "student_id",
        label: "Student",
        type: FieldType.searchInput,
        placeholder: "Select student",
        rules: [
          {
            required: true,
            message: "",
          },
        ],
        searchInputProps: {
          apiRoute: "student",
          placeholder: "Search student by name",
          queryKeys: ["first_name", "middle_name", "last_name"],
          onSelect: (value: any) => {
            onStudentSelect(value);
          },
          onClear: () => {
            onClear();
          },
          incomingOptions: SearchInputOptions,
        },
      },
      {
        name: "grade",
        label: "Grade (Class)",
        type: FieldType.Select,
        placeholder: "Select Grade",
        selectProps: {
          onChange: async (value: string) => {
            onGradeSelect(value);
            setShowStreamFieldOption(
              getGradeDetail({ value })?.hasStream ?? false,
            );
          },
          allowSearch: true,
        },
        options: getGrades({ returnSingleValue: true }),
        rules: [{ required: true, message: "" }],
      },
      ...(showStreamFieldOption
        ? [
            {
              name: "stream",
              label: "Stream",
              type: FieldType.Select,
              placeholder: "Select Stream",
              selectProps: {
                onChange: (value: string) => {
                  onStreamSelect(value);
                },
              },
              options: getStreams(),
              rules: [{ required: true, message: "" }],
            },
          ]
        : []),
      {
        name: "isTransferred",
        label: "Transfer option",
        type: FieldType.checkbox,
        rules: [{ required: false, message: "" }],
        checkboxTypeProps: {
          onChange: (checked: boolean) => {
            setIsTransferred(checked);
            onIsTransferredValueChange && onIsTransferredValueChange(checked);
          },
          checked: isTransferred,
          label: "Is the student transferred from other school or branch?",
        },
      },
      {
        name: "transferredFrom",
        label: "Transferred from",
        type: FieldType.Input,
        disabled: isTransferred ? false : true,
        placeholder: "Enter previous school or branch name transferred from",
        rules: [
          {
            required: isTransferred,
            message: "please specify the name",
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

  return {
    getTableColumns,
    getFormFields,
    AcademicYear,
    gettingAcademicYear,
    SchoolSetting,
    gettingSchoolSetting,
    ServerDate,
    gettingServerDate,
    isEnrollmentPeriodExpired,
  };
};
