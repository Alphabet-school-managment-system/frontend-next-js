import { Select } from "@/components/common/Select";
import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { useUtils } from "@/hooks/useUtils";
import StatusIndicator from "@/lib/status-indicator";
import {
  Enrollment,
  LibraryItem,
  LibraryTransaction,
  Student,
  StudentWithEnrollment,
  Teacher,
  UserType,
} from "@/types";
import { Form, FormInstance } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

export type DataType = LibraryTransaction & {
  enrollment: Enrollment & { student: Student } & { teacher: Teacher } & {
    libraryitem?: LibraryItem;
  };
};

export const useLibraryItemLoan = () => {
  const { ServerDate } = useUtils();
  const serverToday = ServerDate
    ? dayjs(ServerDate).startOf("day")
    : dayjs().startOf("day");
  const isStudentWithEnrollment = (
    value: StudentWithEnrollment | Teacher | Teacher,
  ): value is StudentWithEnrollment | Teacher => "enrollment" in value;
  const { getFormattedIds } = useUtils();

  const loanStatusOptions = [
    { value: "returned", label: "Mark as Returned" },
    { value: "lost", label: "Mark as Lost" },
  ];

  const getTableColumns = ({
    onLoanChange,
    incomingStatus,
    form,
  }: {
    onLoanChange: (value: any) => void;
    incomingStatus?: string | undefined;
    form: FormInstance;
  }): any[] => {
    const [status, setStatus] = useState<string | undefined>(
      incomingStatus || undefined,
    );
    return [
      {
        title: "Borrower",
        dataIndex: "borrower",
        key: "borrower",
        render: (_: string, record: any) => {
          let isStudent: boolean = record?.student_id ? true : false;
          let tmp = isStudent ? record?.enrollment?.student : record?.teacher;

          return (
            <UserProfileInfo
              full_name={`${tmp?.first_name} ${tmp?.middle_name} ${tmp?.last_name}`}
              photoUrl={tmp?.photoUrl}
              subTitle={getFormattedIds(
                isStudent
                  ? tmp?.student_registration_number
                  : tmp?.teacher_registration_number,
                isStudent ? "STU" : "TEA",
              )}
            />
          );
        },
      },
      {
        title: "Book Title",
        dataIndex: "book_title",
        key: "book_title",
        render: (val: string, record: any) => (
          <div className="flex flex-col justify-between text-sm">
            <span>{record?.libraryitem?.title || "-"}</span>
          </div>
        ),
      },
      {
        title: "Issue Date",
        dataIndex: "issue_date",
        key: "issue_date",
        render: (val: string) => (
          <span className="text-sm">
            {val ? dayjs(val).format("MMM D, YYYY") : "-"}
          </span>
        ),
      },
      {
        title: "Due Date",
        dataIndex: "return_date",
        key: "return_date",
        render: (val: string) => {
          const dueDate = val ? dayjs(val).startOf("day") : null;
          const dueDateClass = dueDate
            ? dueDate.isBefore(serverToday, "day")
              ? "text-red-600 font-bold"
              : "text-green-600 font-bold"
            : "text-gray-500";

          return (
            <span className={`text-sm ${dueDateClass}`}>
              {val ? dayjs(val).format("MMM D, YYYY") : "-"}
            </span>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (val: string) => (
          <span>
            <StatusIndicator status={val} />
          </span>
        ),
      },
      {
        title: "Update Status",
        dataIndex: "update_status",
        key: "update_status",
        render: (val: string, record: any) => {
          return (
            <Form
              form={form}
              name="status_update"
              layout="vertical"
              onFinish={() => {}}
              autoComplete="off"
              requiredMark={false}
            >
              <Form.Item name={"status"} className="m-0!">
                <Select
                  data={loanStatusOptions}
                  onChange={(v: any) => {
                    setStatus(v);
                    onLoanChange({ ...record, status: v });
                  }}
                  classNames="w-full!"
                  placeholderText="Change status"
                  variant="outlined"
                />
              </Form.Item>
            </Form>
          );
        },
      },
    ];
  };

  const getFormFields = ({
    onItemSelect,
    onUserSelect,
    onUserClear,
    onItemClear,
    includeId,
    onTypeSelect,
    incomingUserType = "student",
    SearchInputItemOptions,
    SearchInputUserOptions,
  }: {
    onItemSelect: (value: any) => void;
    onUserSelect: (value: StudentWithEnrollment | Teacher) => void;
    onUserClear: () => void;
    onItemClear: () => void;
    includeId?: boolean;
    SearchInputItemOptions?: LibraryItem[];
    SearchInputUserOptions?: Array<DataType>;
    onTypeSelect: (value: any) => void;
    incomingUserType?: UserType;
  }): FieldConfig[] => {
    const [userType, setUserType] = useState<UserType>(incomingUserType);
    const fields: FieldConfig[] = [
      {
        name: "item_id",
        label: "Item",
        type: FieldType.searchInput,
        placeholder: "Select item",
        rules: [{ required: true, message: "" }],
        searchInputProps: {
          apiRoute: "library-item",
          placeholder: "Search item by title",
          queryKeys: ["title"],
          onSelect: (value: string) => {
            onItemSelect(value);
          },
          onClear: () => {
            onItemClear();
          },
          incomingOptions: SearchInputItemOptions,
        },
      },
      {
        name: `${userType}_id`,
        label: "Borrower",
        type: FieldType.searchInput,
        placeholder: "Select teacher or student",
        rules: [{ required: true, message: "" }],
        searchInputProps: {
          apiRoute: userType,
          placeholder: "Search student by name",
          queryKeys: ["first_name", "last_name"],
          onSelect: (value: StudentWithEnrollment | Teacher) => {
            onUserSelect(value);
          },
          onClear: () => {
            onUserClear();
          },
          suffixIcon: (
            <span className="flex justify-end pointer-events-auto cursor-pointer">
              <Select
                data={[
                  {
                    value: "student",
                    label: "Students",
                  },
                  {
                    value: "teacher",
                    label: "Teachers",
                  },
                ]}
                onChange={(value: any) => {
                  setUserType(value);
                  onTypeSelect(value);
                }}
                classNames="shadow-none !focus:shadow-none !outline-none min-w-[150px] w-full flex-1"
                variant="borderless"
                value={userType}
              />
            </span>
          ),
          allowClear: false,
          incomingOptions: SearchInputUserOptions ?? [],
        },
      },
      {
        name: "issue_date",
        label: "Issue Date",
        type: FieldType.Date,
        placeholder: "",
        rules: [{ required: true, message: "" }],
        disabledDate: (current: any) => current > dayjs().endOf("day"),
      },
      {
        name: "return_date",
        label: "Return Date",
        type: FieldType.Date,
        placeholder: "",
        rules: [{ required: true, message: "" }],
        disabledDate: (current: any) => current.isBefore(serverToday, "day"),
      },
      {
        name: "note",
        label: "Note",
        type: FieldType.Textarea,
        placeholder: "Additional information",
        rows: 4,
        className: `w-full`,
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
    isStudentWithEnrollment,
  };
};
