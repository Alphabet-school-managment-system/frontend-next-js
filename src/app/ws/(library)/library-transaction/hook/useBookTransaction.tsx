import { Select } from "@/components/common/Select";
import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import dayjs from "dayjs";
import { useState } from "react";

export const useBookTransaction = () => {
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Borrower",
        dataIndex: "borrower",
        key: "borrower",
        render: (_: string, record: any) => (
          <UserProfileInfo
            full_name={`${record?.first_name} ${record?.middle_name} ${record?.last_name}`}
            photoUrl={record?.photoUrl}
          />
        ),
      },
      {
        title: "Book Title",
        dataIndex: "book_title",
        key: "book_title",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Issue Date",
        dataIndex: "issue_date",
        key: "issue_date",
        render: (val: string) => (
          <span className="text-sm">
            {val ? new Date(val).toLocaleDateString() : "-"}
          </span>
        ),
      },
      {
        title: "Return Date",
        dataIndex: "return_date",
        key: "return_date",
        render: (val: string) => (
          <span className="text-sm">
            {val ? new Date(val).toLocaleDateString() : "-"}
          </span>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
    ];
  };

  const getFormFields = ({
    onBookSelect,
  }: {
    onBookSelect: (fileList: any[]) => void;
  }): FieldConfig[] => {
    return [
      {
        name: "book_id",
        label: "Book",
        type: FieldType.searchInput,
        placeholder: "Select book",
        rules: [{ required: true, message: "" }],
        searchInputProps: {
          apiRoute: "library-book",
          placeholder: "Search book by title",
          queryKeys: ["title"],
          onSelect: (value: string) => {},
        },
      },
      {
        name: "borrower_id",
        label: "Borrower",
        type: FieldType.searchInput,
        placeholder: "Select teacher or student",
        rules: [{ required: true, message: "" }],
        searchInputProps: {
          apiRoute: userType,
          placeholder: "Search student by name",
          queryKeys: ["first_name", "last_name"],
          onSelect: (value: any) => {
            onBookSelect(value);
          },
          suffixIcon: (
            <span className="flex justify-end pointer-events-auto cursor-pointer">
              <Select
                data={[
                  {
                    value: "student",
                    text: "Students",
                  },
                  {
                    value: "teacher",
                    text: "Teachers",
                  },
                ]}
                onChange={(value: any) => {
                  setUserType(value);
                }}
                classNames="shadow-none !focus:shadow-none !outline-none min-w-[150px] w-full flex-1"
                variant="borderless"
                value={userType}
              />
            </span>
          ),
          allowClear: false,
        },
      },
      {
        name: "issue_date",
        label: "Issue Date",
        type: FieldType.Date,
        placeholder: "",
        rules: [{ required: true, message: "" }],
        disabledDate: (current) => current > dayjs().endOf("day"),
      },
      {
        name: "return_date",
        label: "Return Date",
        type: FieldType.Date,
        placeholder: "",
        rules: [{ required: true, message: "" }],
        disabledDate: (current) => current > dayjs().endOf("day"),
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
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
