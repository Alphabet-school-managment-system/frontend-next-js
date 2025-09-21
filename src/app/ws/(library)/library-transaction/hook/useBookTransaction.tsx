import UserProfileInfo from "@/components/common/UserProfileInfo";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { Icon } from "@iconify-icon/react";

export const useBookTransaction = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Borrower",
        dataIndex: "borrower",
        key: "borrower",
        render: (_: string, record: any) => (
          <UserProfileInfo
            first_name={record?.first_name}
            last_name={record?.last_name}
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

  const getFormFields = (): FieldConfig[] => {
    return [
      {
        name: "book_id",
        label: "Book",
        type: FieldType.Select,
        options: [],
        placeholder: "Select book",
        rules: [{ required: false, message: "" }],
      },
      {
        name: "borrower_id",
        label: "Borrower",
        type: FieldType.Select,
        placeholder: "Select teacher or student",
        options: [],
        rules: [{ required: false, message: "" }],
      },
      {
        name: "issue_date",
        label: "Issue Date",
        type: FieldType.Date,
        placeholder: "",
      },
      {
        name: "return_date",
        label: "Return Date",
        type: FieldType.Date,
        placeholder: "",
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
