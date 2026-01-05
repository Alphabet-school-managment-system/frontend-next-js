import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { ColumnsType } from "antd/es/table";
import { Icon } from "@iconify-icon/react";
import { AcademicYear, levels_of_education, Setting, Student } from "@/types";
import { useContext, useState } from "react";
import { useApiQuery } from "@/hooks/useApi";
import { IdsContext } from "@/store/idsContext";
import dayjs from "dayjs";

export const useEnrollment = () => {
  const { Ids } = useContext(IdsContext);

  const { data: AcademicYear, isLoading: gettingAcademicYear } =
    useApiQuery<AcademicYear>(
      [`academic-year/${Ids?.branchId}`],
      `academic-year/${Ids?.branchId}`,
      Ids?.branchId ? true : false
    );

  const { data: SchoolSetting, isLoading: gettingSchoolSetting } =
    useApiQuery<Setting>(
      [`setting/${Ids?.schoolId}`],
      `setting/${Ids?.schoolId}`,
      Ids?.schoolId ? true : false
    );

  const { data: ServerDate, isLoading: gettingServerDate } = useApiQuery<any>(
    [`util/server-date`],
    `util/server-date`
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
            AcademicYear.enrollment_start
          ).format("MMM DD, YYYY")} to ${dayjs(
            AcademicYear.enrollment_end
          ).format("MMM DD, YYYY")}.`,
          status: true,
        };
      }
    }

    return { message: "", status: false };
  };

  const gradeMap: Record<levels_of_education, string[]> = {
    kg: ["KG - 1", "KG - 2", "KG - 3"],
    primary: [
      "Grade 1",
      "Grade 2",
      "Grade 3",
      "Grade 4",
      "Grade 5",
      "Grade 6",
      "Grade 7",
      "Grade 8",
    ],
    secondary: ["Grade 9", "Grade 10"],
    college_prep: ["Grade 11", "Grade 12"],
  };

  const getGrades = (input: levels_of_education | levels_of_education[]) => {
    const types = Array.isArray(input) ? input : [input];
    return types
      .flatMap((type) => gradeMap[type])
      .map((g) => ({ label: g, value: g }));
  };

  const getTableColumns = (): ColumnsType<any> => {
    return [
      {
        title: "Full Name",
        dataIndex: "student",
        key: "student",
        render: (_: string, record: any) => (
          <UserProfileInfo
            full_name={`${record?.student?.first_name} ${record?.student?.middle_name} ${record?.student?.last_name}`}
            photoUrl={record?.student?.photoUrl}
            link={`/ws/student/${record?.student?.id}/detail`}
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
            <span className="text-sm">{record?.student?.phone || "-"}</span>
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
              <span className="text-sm">{record?.student?.email || "-"}</span>
            </div>
          );
        },
      },
      {
        title: "Class",
        dataIndex: "class_name",
        key: "class_name",
        render: (val: string, record: any) => (
          <span className="text-sm">{record?.grade || "-"}</span>
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
    ];
  };

  const getFormFields = ({
    onStudentSelect,
    onGradeSelect,
    onClear,
    levels_of_education,
    includeId = false,
    isTransferredValue = false,
  }: {
    onStudentSelect: (student: Student) => void;
    onGradeSelect: (grade: string) => void;
    onClear: () => void;
    levels_of_education: levels_of_education[];
    includeId?: boolean;
    isTransferredValue?: boolean;
  }): FieldConfig[] => {
    const [isTransferred, setIsTransferred] =
      useState<boolean>(isTransferredValue);

    const fields = [
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
          onClear: () => {
            onClear();
          },
        },
      },
      {
        name: "grade",
        label: "Grade (Class)",
        type: FieldType.Select,
        placeholder: "Select Grade",
        selectProps: {
          onChange: (value: string) => {
            onGradeSelect(value);
          },
        },
        options: getGrades(levels_of_education),
        rules: [{ required: true, message: "" }],
      },
      {
        name: "isTransferred",
        label: "Transfer option",
        type: FieldType.checkbox,
        rules: [{ required: false, message: "" }],
        checkboxTypeProps: {
          onChange: (checked: boolean | ((prevState: boolean) => boolean)) => {
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
    getGrades,
    AcademicYear,
    gettingAcademicYear,
    SchoolSetting,
    gettingSchoolSetting,
    ServerDate,
    gettingServerDate,
    isEnrollmentPeriodExpired,
  };
};
