import { useTeacher } from "@/app/ws/(user)/teacher/hook/useTeacher";
import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { isValidISBN } from "@/lib/format-phone-number";
import { Icon } from "@iconify-icon/react";
import dayjs from "dayjs";

export const useLibraryItem = () => {
  const libraryItemType = [
    { label: "Book", value: "book" },
    { label: "Magazine", value: "magazine" },
    { label: "Journal", value: "journal" },
    { label: "E-Book", value: "e_book" },
    { label: "Audio Book", value: "audio_book" },
    { label: "Reference Book", value: "reference_book" },
    { label: "Other", value: "other" },
  ];

  const getLabels = (value: string) => {
    const item = libraryItemType.find((item) => item.value === value);
    return item ? item.label : value;
  };

  const getTableColumns = (): any[] => {
    return [
      {
        title: "Registration Number",
        dataIndex: "registration_number",
        key: "registration_number",
        render: (val: string, record: any) => {
          return (
            <span className="text-sm font-semibold">
              {record?.isParent ? `${record.from} - ${record.to}` : val}
            </span>
          );
        },
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (val: string, record: any) => {
          return <span className="text-sm">{val ?? "-"}</span>;
        },
      },
      {
        title: "Author",
        dataIndex: "author",
        key: "author",
        render: (val: string, record: any) => (
          <span className="text-sm">{val ?? "-"}</span>
        ),
      },

      {
        title: "Subject",
        dataIndex: "subject",
        key: "subject",
        render: (val: string, record: any) => (
          <span className="text-sm">{val ?? "-"}</span>
        ),
      },
      {
        title: "Item Type",
        dataIndex: "item_type",
        key: "item_type",
        render: (val: string, record: any) => (
          <span className="text-sm">
            {val ? (
              <span className="font-semibold">{getLabels(val)}</span>
            ) : (
              "-"
            )}
          </span>
        ),
      },
      {
        title: "Publication Date",
        dataIndex: "publication_date",
        key: "publication_date",
        render: (val: string, record: any) => (
          <span className="text-sm">
            {val ? dayjs(val).format("DD/MM/YYYY") : "-"}
          </span>
        ),
      },

      {
        title: "Available Copies",
        dataIndex: "copies_available",
        key: "copies_available",
        render: (val: string, record: any) => (
          <span className="text-sm">{val ?? "-"}</span>
        ),
      },
      {
        title: "ISBN",
        dataIndex: "isbn",
        key: "isbn",
        render: (val: string, record: any) => (
          <span className="text-sm">{val ?? "-"}</span>
        ),
      },
    ];
  };

  const { subjectOptions } = useTeacher();

  const getFormFields = (): FieldConfig[] => {
    return [
      {
        name: "id",
        label: "",
        type: FieldType.hidden,
        placeholder: "",
        rules: [{ required: false, message: "" }],
        hidden: true,
      },
      {
        name: "title",
        label: "Title",
        type: FieldType.Input,
        placeholder: "Enter the book title",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "author",
        label: "Author",
        type: FieldType.Input,
        placeholder: "Enter the author, co-author or publisher",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "item_type",
        label: "Item Type",
        type: FieldType.Select,
        placeholder: "Select the type of library item",
        options: libraryItemType,
        rules: [{ required: true, message: "" }],
      },
      {
        name: "subject",
        label: "Subject",
        type: FieldType.Select,
        placeholder: "Select the subject",
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
        name: "copies_available",
        label: "Available Copies",
        type: FieldType.number,
        placeholder: "Enter the number of available copies",
        value: 1,
        min: 1,
        rules: [{ required: true, message: "" }],
      },
      {
        name: "isbn",
        label: "ISBN (International standard book number)",
        type: FieldType.Input,
        placeholder: "########## or #############",
        prefix: (
          <span className="flex items-center justify-center h-full">
            <Icon
              icon="fluent:book-number-16-regular"
              className="text-gray-500"
              width={22}
              height={22}
            />
          </span>
        ),
        rules: [
          {
            validator: (_: any, value: string) => {
              const raw = String(value ?? "")
                .replace(/[\s-]+/g, "")
                .toUpperCase();
              if (!raw || isValidISBN(raw)) {
                return Promise.resolve();
              }
              return Promise.reject("ISBN must be 10 or 13 characters");
            },
          },
        ],
        max: undefined,
      },
      {
        name: "publication_date",
        label: "Publication Date",
        type: FieldType.Date,
        placeholder: "",
        disabledDate: (current) => current > dayjs().endOf("day"),
        rules: [{ required: true, message: "" }],
      },
      {
        name: "note",
        label: "Note",
        type: FieldType.Textarea,
        placeholder: "additional information about the book",
        rows: 4,
        className: "w-full",
        rules: [{ required: false, message: "" }],
      },
      {
        name: "branch_id",
        label: "",
        type: FieldType.hidden,
        placeholder: "",
        rules: [{ required: false, message: "" }],
      },
    ];
  };

  return {
    getTableColumns,
    getFormFields,
    libraryItemType,
  };
};
